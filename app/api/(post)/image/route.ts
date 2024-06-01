import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import connectDB from "@/lib/dbConnection/db";
import DynamicSchema from "@/app/model/model";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebaseCofig/config";
import Pusher from "pusher";

const TOKEN = process.env.HF_ACCESS_TOKEN;
const hf = new HfInference(TOKEN);

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

        await pusher.trigger("load", "load-event", {
            loading: 10,
        })

        const res = await hf.textToImage({
            model: 'stabilityai/stable-diffusion-xl-base-1.0',
            inputs: message.content,
            parameters: {
                negative_prompt: 'blurry',
            }
        });

        await pusher.trigger("load", "load-event", {
            loading: 33,
        })

        const storageRef = ref(storage, `images/${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, res);

        const downloadURL = await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

        await pusher.trigger("load", "load-event", {
            loading: 66,
        })

        await connectDB();
        const User = DynamicSchema('image');

        const newUserActivity = new User({
            aiContent: downloadURL,
            userContent: message.content,
            date: new Date(),
            uid: userId,
        });

        await pusher.trigger("load", "load-event", {
            loading: 100,
        })

        await newUserActivity.save();

        return new NextResponse("DONE", { status: 200 });

    } catch (error) {
        console.log("[image Error]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
