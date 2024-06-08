import UserSubscription from "@/app/model/userSubscription";
import connectDB from "@/lib/dbConnection/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: any) {
    try {
        const { id } = params;
        await connectDB()
        // const { uid } = await req.json()
        if (!id) {
            return new NextResponse("User Id is Required", { status: 400 })
        }

        const response = await UserSubscription.deleteOne({ uid: id })
        return new NextResponse("Done", { status: 200 })
    } catch (error) {
        console.log(error, "Internal server Error")
    }
}