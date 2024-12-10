import { FavoriteModel } from "../../models/favorite.js";
import { errorHandler } from "../../helpers/errorHandler.js";
import { TrackModel } from "../../models/track.js";
import { AlbumModel } from "../../models/album.js";
import { ArtistModel } from "../../models/artist.js";

export async function getFavorites(req, res) {
  try {
    const category = req.params.category;
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    if (!category) {
      return errorHandler(
        { statusCode: 400, message: "Bad request category is required" },
        res
      );
    }
    const user = req.user;
    let favorites = await FavoriteModel.find({
      user: user._id,
      category: category,
    })
      .skip(offset)
      .limit(limit)
      .exec();
    for (let i = 0; i < favorites.length; i++) {
      const favorite = favorites[i];

      if (category === "track") {
        let trackId = favorite.item_id;
        const track = await TrackModel.findById(trackId);
        favorites[i].name = track.name;
        favorites[i].created_at = track.createdAt;
      }
      if (category === "album") {
        let albumId = favorite.item_id;
        const album = await AlbumModel.findById(albumId);
        favorites[i].name = album.name;
        favorites[i].created_at = album.createdAt;
      }
      if (category === "artist") {
        let artistId = favorite.item_id;
        const artist = await ArtistModel.findById(artistId);
        favorites[i].name = artist.name;
        favorites[i].created_at = artist.createdAt;
      }
    }
    favorites = favorites.map((favorite) => {
      return {
        favorite_id: favorite._id,
        name: favorite.name,
        category: favorite.category,
        item_id: favorite.item_id,
        created_at: favorite.created_at,
      };
    });
    return res.status(200).json({
      data: favorites,
      status: 200,
      error: null,
      message: "Favorites retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function addFavorite(req, res) {
  try {
    const { category, item_id } = req.body;
    if (!category || !item_id) {
      return errorHandler(
        {
          statusCode: 400,
          message: "Bad request category and item_id are required",
        },
        res
      );
    }
    const user = req.user;
    const favorite = new FavoriteModel({
      user: user._id,
      category: category,
      item_id: item_id,
    });
    await favorite.save();
    return res.status(201).json({
      data: null,
      status: 201,
      error: null,
      message: "Favorite added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

export async function deleteFavorite(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return errorHandler(
        { statusCode: 400, message: "Bad request :Id is required" },
        res
      );
    }
    const favorite = await FavoriteModel.findById(id);
    if (!favorite) {
      return errorHandler(
        { statusCode: 404, message: "Favorite not found" },
        res
      );
    }
    await favorite.deleteOne();
    return res.status(200).json({
      data: null,
      status: 200,
      message: "Favorite removed successfully",
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
