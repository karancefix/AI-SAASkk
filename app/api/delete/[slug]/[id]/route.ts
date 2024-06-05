import DynamicSchema from '@/app/model/model';
import connectDB from "@/lib/dbConnection/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


type Params = {
    id: string,
    slug: string
}

export async function DELETE(req: NextRequest, context: { params: Params }) {
    try {
        const { id, slug } = context.params;
        if (!id) {
            return NextResponse.json({ error: 'Id parameter is missing' }, { status: 400 });
        }
        connectDB();
        const UserModel = DynamicSchema(slug);
        const deleted = await UserModel.findByIdAndDelete(id as string);
        return NextResponse.json({
            success: true,
            deleted
        })
    } catch (error) {
        console.log(error);

    }
}