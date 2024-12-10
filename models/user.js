import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "editor"],
      default: "user",
    },
    password: {
      type: String,
      minlength: 8,
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("user", userSchema);
export { UserModel };
