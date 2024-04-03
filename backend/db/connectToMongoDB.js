import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("has been connect to DB");
  } catch (err) {
    console.log(err);
  }
};

export default connectToMongoDB;
