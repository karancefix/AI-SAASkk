import connectDB from "@/lib/dbConnection/db";
import DynamicSchema from "@/app/model/model";
import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";


const TOKEN = process.env.HF_ACCESS_TOKEN;
const hf = new HfInference(TOKEN);

export async function POST(req: Request) {
    try {
        return new NextResponse("Done", { status: 200 })
    } catch (error) {
        console.log("[Music Error]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}