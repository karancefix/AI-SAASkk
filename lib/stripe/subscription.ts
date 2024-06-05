import { auth } from "@clerk/nextjs/server";
import connectDB from "../dbConnection/db";
import UserSubscription from "@/app/model/userSubscription";


const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const { userId } = auth();
    if (!userId) {
        return false
    }

    await connectDB();
    const userSubscription = await UserSubscription.findOne({ uid: userId }, `stripe_subscription_id stripe_current_period_end stripe_customer_id stripe_price_id`)

    if (!userSubscription) {
        return false
    }

    const isValid = userSubscription.stripe_price_id && userSubscription.stripe_current_period_end?.getTime() + DAY_IN_MS > Date.now()

    return !!isValid;

}