import DynamicSchema from '@/app/model/model';
import connectDB from "@/lib/dbConnection/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


type Params = {
    id: string,
    slug: string
}

export async function DELETE(req: NextApiRequest, context: { params: Params }) {
    try {
        const { id, slug } = context.params;
        if (!id) {
            return NextResponse.json({ error: 'Id parameter is missing' }, { status: 400 });
        }
        const UserModel = DynamicSchema(slug);
        const deletedConversation = await UserModel.findByIdAndDelete(id as string);
        return NextResponse.json({
            success: true,
            deletedConversation
        })
    } catch (error) {
        console.log(error);

    }
}