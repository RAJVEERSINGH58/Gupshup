import mongoose, { mongo } from 'mongoose';

export const connectDb = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL
  const insatnce = await mongoose.connect(MONGODB_URL);
  console.log(`MongoDb Connected : ${insatnce.connection.host}`);
  } catch (error) {
      console.log(error);
  }
}