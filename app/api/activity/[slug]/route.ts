import DynamicSchema from '@/app/model/model';
import connectDB from '@/lib/dbConnection/db';
import { auth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


type Params = {
  slug: string
}

export async function GET(req: Request, context: { params: Params }) {
  try {

    const params = context.params;
    const { slug } = params;

    // Make collection optional
    if (!slug) {
      return NextResponse.json({ error: 'Collection parameter is missing' }, { status: 400 });
    }

    const { userId } = auth();

    // Check if userId is available
    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    await connectDB();

    // Get the UserModel using DynamicSchema or directly import your User model
    const UserModel = DynamicSchema(slug);

    // Fetch user activities using the userId
    const userActivities = await UserModel.find({ uid: userId }).sort({ createdAt: -1 }).exec();

    // Send the user activities as JSON response
    return NextResponse.json(userActivities);
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
