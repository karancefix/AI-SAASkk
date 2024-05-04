import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key is not configured", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are Required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[Converstion Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
