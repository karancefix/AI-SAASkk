// import { Schema, model, models, Document } from 'mongoose';

// // Define the TypeScript interface for the User
// interface IUser extends Document {
//     uid: string;
//     stripe_customer_id?: string;
//     stripe_subscription_id?: string;
//     stripe_price_id?: string;
//     stripe_current_period_end?: Date;
// }

// // Define the User schema
// const userSchema = new Schema<IUser>({
//     uid: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     stripe_customer_id: {
//         type: String,
//         required: false
//     },
//     stripe_subscription_id: {
//         type: String,
//         required: false
//     },
//     stripe_price_id: {
//         type: String,
//         required: false
//     },
//     stripe_current_period_end: {
//         type: Date,
//         required: false
//     }
// });

// // Create the User model if it doesn't already exist
// const User = models.User || model<IUser>('User', userSchema);

// export default User;

import { Schema, model, models, Document } from 'mongoose';

interface IUserSubscription extends Document {
    uid: string;
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    stripe_price_id?: string;
    stripe_current_period_end?: Date;
}

const userSubscriptionSchema = new Schema<IUserSubscription>({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    stripe_customer_id: {
        type: String,
        required: false
    },
    stripe_subscription_id: {
        type: String,
        required: false
    },
    stripe_price_id: {
        type: String,
        required: false
    },
    stripe_current_period_end: {
        type: Date,
        required: false
    }
});

const UserSubscription = models.UserSubscription || model<IUserSubscription>('UserSubscription', userSubscriptionSchema);

export default UserSubscription;
export type { IUserSubscription };
