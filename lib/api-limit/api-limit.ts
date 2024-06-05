import connectDB from "@/lib/dbConnection/db";
import { useAuth } from "@clerk/nextjs";
import { MAX_FREE_COUNT } from "@/constants";
import { usePathname } from 'next/navigation'
import DynamicSchema from "@/app/model/model";
// import { AwardIcon } from "lucide-react";


export const increaseApiLimit = async (pathname: string, userId: string) => {
    // const { userId } = useAuth();
    // let pathname = usePathname();
    // pathname = pathname.split('/').join('');

    if (!userId) {
        return;
    }

    await connectDB();
    const UserModel = DynamicSchema(pathname);
    let userApiLimit = await UserModel.findOne({ uid: userId }, 'count');

    if (!userApiLimit) {
        return "User not found :("
    }

    else {
        const result = await UserModel.updateMany({ uid: userId },
            {
                $set:
                {
                    count: Number(userApiLimit.count) + 1
                }
            });
    }
}

export const checkApiLimit = async (pathname: string, userId: string) => {

    if (!userId) {
        return;
    }

    await connectDB();
    const UserModel = DynamicSchema(pathname);
    let userApiLimit = await UserModel.findOne({ uid: userId });

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNT) {
        return true
    }
    else {
        return false
    }

}

export const getApiLimitCount = async (userId: string, pathname: string) => {

    // const { userId } = useAuth();
    // let pathname = usePathname();
    // pathname = pathname.split('/').join('')

    if (!userId) {
        return;
    }

    await connectDB();
    const UserModel = DynamicSchema(pathname);
    let userApiLimit = await UserModel.findOne({ uid: userId }, 'count');

    if (!userApiLimit) {
        return 0
    }

    return userApiLimit.count

}