import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in seconds
    hidden: { type: Boolean, default: false },
    album: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }], // Associated album
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }], // Associated artists
  },
  { timestamps: true }
);

const TrackModel = mongoose.model("Track", trackSchema);
export { TrackModel };
