import UserSubscription from "@/app/model/userSubscription"
import connectDB from "@/lib/dbConnection/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        // const { uid } = await req.json()
        // if (!uid) {
        //     return new NextResponse("User Id is Required", { status: 400 })
        // }

        // if (uid !== "user_2fmBA7gmVHaHtMZusK0BEdRE00r") {
        //     return new NextResponse("Unauthorized", { status: 401 })
        // }

        await connectDB()
        const data = await UserSubscription.find({})
        console.log("getting uid")
        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.log(error, "Internal server Error")
    }

}