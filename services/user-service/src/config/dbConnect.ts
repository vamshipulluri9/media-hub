import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any
    );
    console.log("database connected" + conn.connection.host);
  } catch (error) {
    console.error((error as Error).message);
  }
};

export default dbConnect;
