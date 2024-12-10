import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    grammy: { type: Number, default: 0 },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ArtistModel = mongoose.model("Artist", artistSchema);
export { ArtistModel };
