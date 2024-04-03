import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "Database Connected @",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
