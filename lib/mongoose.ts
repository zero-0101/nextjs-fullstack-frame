import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error);
  }

  if (isConnected) return console.log("Already connect mongoDB");
};
