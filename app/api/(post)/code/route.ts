import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import connectDB from "@/lib/dbConnection/db";
import DynamicSchema from "@/app/model/model";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit/api-limit";
import { checkSubscription } from "@/lib/stripe/subscription";


const TOKEN = process.env.HF_ACCESS_TOKEN;
const hf = new HfInference(TOKEN);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    let { message } = body;
    message = JSON.stringify(message);
    message = JSON.parse(message);



    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    if (!message) {
      return new NextResponse("Messages are Required", { status: 400 });
    }

    const freeTrial = await checkApiLimit("conversation", userId)
    const isPro = await checkSubscription();
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial limit exceeded", { status: 403 })
    }


    const response = await hf.textGeneration({
      model: "EleutherAI/gpt-neox-20b",
      inputs: message.content,
    });

    await connectDB();
    const User = DynamicSchema('code');
    const newUserActivity = new User({
      aiContent: response.generated_text,
      userContent: message.content,
      date: new Date(),
      uid: userId,
    });

    await newUserActivity.save();
    if (!isPro) {
      await increaseApiLimit("conversation", userId)

    }


    return NextResponse.json({
      role: "Genius",
      content: response.generated_text,
    });
  } catch (error) {
    console.log("[Code Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
