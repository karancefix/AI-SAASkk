import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnection/db";
import DynamicSchema from "@/app/model/model";
// import { HfInference } from "@huggingface/inference";
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit/api-limit";
import Pusher from "pusher";
import { checkSubscription } from "@/lib/stripe/subscription";
// import { stat } from "fs";
// import { storage } from "@/lib/firebaseCofig/config";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const replicate = new Replicate();
// const TOKEN = process.env.HF_ACCESS_TOKEN;
// const hf = new HfInference(TOKEN);

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID || '',
    key: process.env.PUSHER_KEY || '',
    secret: process.env.PUSHER_SECRET || '',
    cluster: process.env.PUSHER_CLUSTER || '',
    useTLS: true,
});


export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { message } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!message || !message.content) {
            return new NextResponse("Messages are Required", { status: 400 });
        }

        const freeTrial = await checkApiLimit("conversation", userId)
        const isPro = await checkSubscription();
        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial limit exceeded", { status: 403 })
        }
        // const input = {
        //     prompt_b: message.content,
        // };

        await pusher.trigger("load", "load-event", {
            loading: 15,
            message: "Generating Video"
        })

        const input = {
            prompt: message.content
        };

        const res = await replicate.run("cjwbw/videocrafter:02edcff3e9d2d11dcc27e530773d988df25462b1ee93ed0257b6f246de4797c8", { input });

        // console.log("video generated")
        // return new NextResponse(JSON.stringify(res), { status: 200 })
        // const res = await hf.textToSpeech({
        //     model: 'facebook/musicgen-small',
        //     inputs: message.content,
        //     // duration: 5,
        // })
        // console.log(res)
        // return new NextResponse(res, { status: 200 })
        // console.log("first")

        // const res: any = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });

        // console.log("second")

        await pusher.trigger("load", "load-event", {
            loading: 50,
            message: "Hold on tight!",
        })

        // const storageRef = ref(storage, `video/${Date.now()}-${userId}`);
        // const uploadTask = uploadBytesResumable(storageRef, res);

        // const downloadURL = await new Promise((resolve, reject) => {
        //     uploadTask.on('state_changed',
        //         (snapshot) => {
        //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         },
        //         (error) => {
        //             console.error('Upload error:', error);
        //             reject(error);
        //         },
        //         () => {
        //             getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        //         }
        //     );
        // });

        // await pusher.trigger("load", "load-event", {
        //     loading: 80,
        //     message: "Almost there"
        // })

        await connectDB();

        await pusher.trigger("load", "load-event", {
            loading: 100,
            message: "Done"
        })

        const User = DynamicSchema('video');

        const newUserActivity = new User({
            aiContent: res,
            userContent: message.content,
            date: new Date(),
            uid: userId,
        });

        await newUserActivity.save();

        if (!isPro) {
            await increaseApiLimit("conversation", userId)
        }


        return new NextResponse("DONE", { status: 200 });

    } catch (error) {
        console.log("[Video Error]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
