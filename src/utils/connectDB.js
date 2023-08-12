import mongoose from "mongoose";

async function connectDB() {
  try {
    if (mongoose.connection.readyState == 1) return;
    await mongoose.connect(process.env.MONGO_URL)
    console.log("connection success! amir")
  } catch (err) {
    console.log("connection failed!")
  }
  // if (mongoose.connections[0].readyState) return;
  // mongoose.set("strictQuery", false);
  // await mongoose.connect(process.env.MONGO_URI);
  // console.log("Connected to DB");
}

export default connectDB;