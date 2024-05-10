// // mongodb.ts

// import { MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb';
// import mongoose from 'mongoose'


// const uri = process.env.MONGODB_URI;
// const options: MongoClientOptions = {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// }

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!uri) {
//   throw new Error('Add Mongo URI to .env.local');
// }

// else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;


// mongodb.ts

// import mongoose from 'mongoose';

// const uri = process.env.MONGODB_URI;

// if (!uri) {
//   throw new Error('Add Mongo URI to .env.local');
// }

// // Connect to MongoDB using Mongoose
// mongoose.connect(uri);

// const db = mongoose.connection;

// // Handle MongoDB connection events
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// export default db;  


import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI;

declare global {
  var mongoose: any;
}

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!DATABASE_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false, // Disable command buffering

    };

    cached.promise = mongoose.connect(DATABASE_URL).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;