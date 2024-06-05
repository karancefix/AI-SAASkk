// import { auth, currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/dbConnection/db";
// import User from "@/app/model/userSubscription";
// import { stripe } from "@/lib/stripe/stripe";
// import { absoluteUrl } from "@/lib/utils";

// const settingsUrl = absoluteUrl("/settings")

// export async function GET() {
//     try {
//         const { userId } = auth();
//         const user = await currentUser();
//         if (!userId || !user) {
//             return new NextResponse("Unauthorized", { status: 401 })
//         }

//         await connectDB()
//         const userSubscription = User.findOne({ uid: userId })
//         if (userSubscription && userSubscription.stripe_customer_id) {

//         }
//     } catch (error) {
//         console.log("[STRIPE ERROR]", error)
//         return new NextResponse("Internal Server Error", { status: 500 })
//     }
// }

import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnection/db";
import UserSubscription, { IUserSubscription } from "@/app/model/userSubscription";
import { stripe } from "@/lib/stripe/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
    try {
        const { userId } = auth();
        const user = await currentUser();
        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectDB();
        const userSubscription = await UserSubscription.findOne({ uid: userId }) as IUserSubscription;

        if (userSubscription && userSubscription.stripe_customer_id) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripe_customer_id,
                return_url: settingsUrl,
            })

            return new NextResponse(JSON.stringify({ url: stripeSession.url }))

        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Genius Pro",
                            description: "Unlimited AI Generations!",
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1,
                }


            ],
            metadata: {
                userId,
            }
        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }))


    } catch (error) {
        console.log("[STRIPE ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
