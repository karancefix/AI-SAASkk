import { Stripe } from 'stripe';
import { headers } from 'next/headers'
import { NextResponse } from 'next/server';
import connectDB from "@/lib/dbConnection/db";
import { stripe } from '@/lib/stripe/stripe';
import UserSubscription from '@/app/model/userSubscription';


export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-signature") as string

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )

    } catch (error: any) {
        return new NextResponse(`Webhook Error : ${error.message}`, { status: 400 })

    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )

        if (!session?.metadata?.userId) {
            return new NextResponse("User Id is required", { status: 400 })
        }
        await connectDB()
        const user = new UserSubscription({
            uid: session?.metadata?.userId,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            stripe_price_id: subscription.items.data[0].price.id,
            stripe_current_period_end: new Date(subscription.current_period_end * 1000),
        })
        await user.save()
    }


    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        await connectDB()
        UserSubscription.updateOne({ stripe_subscription_id: subscription.id }, {
            $set: {
                stripe_price_id: subscription.items.data[0].price.id,
                stripe_current_period_end: new Date(
                    subscription.current_period_end * 1000
                )
            }
        })

    }

    return new NextResponse(null, { status: 200 })
}

