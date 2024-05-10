import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import connectDB from "@/lib/dbConnection/db";
import DynamicSchema from "@/app/model/model";


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

    const response = await hf.textGeneration({
      model: "tiiuae/falcon-7b-instruct",
      inputs: message.content,
    });

    await connectDB();
    const User = DynamicSchema('conversation');
    const newUserActivity = new User({
      aiContent: response.generated_text,
      userContent: message.content,
      date: new Date(),
      uid: userId,
    });

    await newUserActivity.save();

    return NextResponse.json({
      role: "Genius",
      content: response.generated_text,
    });
  } catch (error) {
    console.log("[Converstion Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
