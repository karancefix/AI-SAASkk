import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { HfInference } from "@huggingface/inference";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY2,
});

const TOKEN = process.env.HF_ACCESS_TOKEN;
const hf = new HfInference(TOKEN);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    let { message } = body;
    message = JSON.stringify(message);
    message = JSON.parse(message);

    // Extract the "content" value from the first element of the array
    // let contentValue = jsonArray[jsonArray.length - 1].content;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key is not configured", {
        status: 500,
      });
    }

    if (!message) {
      return new NextResponse("Messages are Required", { status: 400 });
    }

    // const response = await openai.chat.completions.create({
    //   messages,
    //   model: "gpt-3.5-turbo",
    // });

    const response = await hf.textGeneration({
      model: "tiiuae/falcon-7b-instruct",
      inputs: message.content,
    });

    // return NextResponse.json(response.choices[0].message);
    return NextResponse.json({
      role: "Genius",
      content: response.generated_text,
    });
  } catch (error) {
    console.log("[Converstion Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
