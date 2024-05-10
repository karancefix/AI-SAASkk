// User.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the schema for the User model
interface UserActivity {
    aiContent: string,
    userContent: string,
    date: Date,
    uid: string,
}

interface UserDocument extends UserActivity, Document { }

const DynamicSchema = (collectionName: string) => {
    // Check if the model already exists
    if (mongoose.models[collectionName]) {
        // Return the existing model if found
        return mongoose.models[collectionName] as Model<UserDocument>;
    }

    const User = new Schema<UserDocument>({
        aiContent: { type: String, required: true },
        userContent: { type: String, required: true },
        date: { type: Date, required: true },
        uid: { type: String, required: true },
    });

    // Create the User model using the schema
    const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(collectionName, User);

    return UserModel;
}

export default DynamicSchema;
