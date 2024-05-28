// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { HfInference } from "@huggingface/inference";
// import connectDB from "@/lib/dbConnection/db";
// import DynamicSchema from "@/app/model/model";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


// import { storage } from "@/lib/firebaseCofig/config";


// const TOKEN = process.env.HF_ACCESS_TOKEN;
// const hf = new HfInference(TOKEN);

// export async function POST(req: Request) {
//     try {
//         // const { userId } = auth();
//         // const body = await req.json();
//         // let { message } = body;
//         // message = JSON.stringify(message);
//         // message = JSON.parse(message);


//         // if (!userId) {
//         //     return new NextResponse("Unauthorized", { status: 401 });
//         // }


//         // if (!message) {
//         //     return new NextResponse("Messages are Required", { status: 400 });
//         // }
//         const res = await hf.textToImage({
//             model: 'stabilityai/stable-diffusion-xl-base-1.0',
//             inputs: 'award winning high resolution photo of a flying angel in animation with magical wand in hand with crown and wings and long hair and white princess dress ',
//             parameters: {
//                 negative_prompt: 'blurry',
//             }
//         })

//         await connectDB();
//         const User = DynamicSchema('image');

//         const storageRef = ref(storage, `images/${Date.now()}`);
//         const uploadTask = uploadBytesResumable(storageRef, res);

//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                 }
//             },
//             (error) => {
//                 // A full list of error codes is available at
//                 // https://firebase.google.com/docs/storage/web/handle-errors
//                 switch (error.code) {
//                     case 'storage/unauthorized':
//                         // User doesn't have permission to access the object
//                         break;
//                     case 'storage/canceled':
//                         // User canceled the upload
//                         break;

//                     // ...

//                     case 'storage/unknown':
//                         // Unknown error occurred, inspect error.serverResponse
//                         break;
//                 }
//             },
//             () => {
//                 // Upload completed successfully, now we can get the download URL
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     const newUserActivity = new User({
//                         aiContent: downloadURL,
//                         userContent: "award winning high resolution photo of a flying angel  /((ladybird)) hybrid, [trending on artstation]",
//                         date: new Date(),
//                         uid: "userId",
//                     });

//                     newUserActivity.save();

//                 });
//             }
//         );

//         return new NextResponse("DONE", { status: 200 });


//     }
//     catch (error) {
//         console.log("[image Error]", error);
//         return new NextResponse("Internal Error", { status: 500 });
//     }
// }

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import connectDB from "@/lib/dbConnection/db";
import DynamicSchema from "@/app/model/model";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebaseCofig/config";

const TOKEN = process.env.HF_ACCESS_TOKEN;
const hf = new HfInference(TOKEN);

const models = [
    'stabilityai/stable-diffusion-xl-base-1.0',
    // "runwayml/stable-diffusion-v1-5",
    "kandinsky-community/kandinsky-2-2-decoder",
    // "lllyasviel/control_v11p_sd15_openpose",

    // Add more models here
];

export async function POST(req: Request) {
    try {
        // const { userId } = auth();
        // const body = await req.json();
        // let { message } = body;
        // message = JSON.stringify(message);
        // message = JSON.parse(message);

        // if (!userId) {
        //     return new NextResponse("Unauthorized", { status: 401 });
        // }

        // if (!message) {
        //     return new NextResponse("Messages are Required", { status: 400 });
        // }

        await connectDB();
        const User = DynamicSchema('image');
        const imageUrls = [];

        for (const model of models) {
            const res = await hf.textToImage({
                model,
                inputs: "Astronaut in a jungle, cold color palette, muted colors, detailed, 8k",
                parameters: {
                    negative_prompt: 'blurry',
                }
            });

            const storageRef = ref(storage, `images/${Date.now()}-${model}`);
            const uploadTask = uploadBytesResumable(storageRef, res);

            const downloadURL = await new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        console.error('Upload error:', error);
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
                    }
                );
            });

            imageUrls.push({
                model,
                url: downloadURL
            });
        }

        // Convert imageUrls array to JSON string
        const imageUrlsString = JSON.stringify(imageUrls);

        const newUserActivity = new User({
            aiContent: imageUrlsString,
            userContent: "message",
            date: new Date(),
            uid: "userId",
        });

        await newUserActivity.save();

        return new NextResponse("DONE", { status: 200 });
    } catch (error) {
        console.log("[image Error]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
