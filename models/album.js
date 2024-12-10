import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    hidden: { type: Boolean, default: false },
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }], // Many-to-many with artists
  },
  { timestamps: true }
);

const AlbumModel = mongoose.model("Album", albumSchema);
export { AlbumModel };
