import mongoose from "mongoose";

const mongoConnection = async () => {
  await mongoose.connect(
    process.env.MONGO_URL || "mongodb://localhost:27017/ft-be"
  );
};

export default mongoConnection;
