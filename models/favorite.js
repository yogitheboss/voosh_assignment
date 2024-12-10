import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true }, // User who marked as favorite
    category: {
      type: String,
      enum: ["artist", "album", "track"], // Type of favorite item
      required: true,
    },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID of the favorite item (artist, album, or track)
  },
  { timestamps: true }
);

const FavoriteModel = mongoose.model("Favorite", favoriteSchema);
export { FavoriteModel };
