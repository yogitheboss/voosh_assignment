import mongoose from "mongoose";
export const initDb = () => {
  mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });
};
