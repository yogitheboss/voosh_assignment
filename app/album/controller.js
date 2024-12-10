import { AlbumModel } from "../../models/album.js";
import { errorHandler } from "../../helpers/errorHandler.js";
export async function getAlbums(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const id = req.query.id;
    const hidden = req.query.hidden;
    const filter = {};
    if (id !== undefined) filter._id = id;
    if (hidden !== undefined) filter.hidden = hidden === "true";
    const albums = await AlbumModel.find(filter)
      .skip(offset)
      .limit(limit)
      .populate("artists")
      .select("name")
      .exec();
    const newAlbums = albums.map((album) => {
      return {
        id: album._id,
        name: album.name,
        artist_name: album.artists.map((artist) => artist.name),
        year: album.year,
        hidden: album.hidden,
      };
    });
    return res.status(200).json({
      data: newAlbums,
      status: 200,
      error: null,
      message: "Albums retrieved successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

export async function getAlbum(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return errorHandler(
        { status: 400, message: "Bad request Id is required" },
        res
      );
    }
    const album = await AlbumModel.findById(id).populate("artists").exec();
    const newAlbum = {
      id: album._id,
      name: album.name,
      artist_name: album.artists.map((artist) => artist.name),
      year: album.year,
      hidden: album.hidden,
    };
    if (!album) {
      return errorHandler({ status: 404, message: "Album not found" }, res);
    }
    return res.status(200).json({
      data: album,
      status: 200,
      message: "Album retrieved successfully",
      error: null,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", status: 500 });
  }
}

export async function addAlbum(req, res) {
  const { name, artists, year, hidden } = req.body;
  try {
    if (!name) {
      return errorHandler({ status: 400, message: "Name is required" }, res);
    }
    if (!year) {
      return errorHandler({ status: 400, message: "Year is required" }, res);
    }
    const album = new AlbumModel({ name, artists, year, hidden });
    await album.save();
    return res
      .status(201)
      .json({ data: null, status: 201, message: "Album added successfully" });
  } catch (err) {
    return errorHandler({ status: 500, message: "Internal server error" }, res);
  }
}

export async function updateAlbum(req, res) {
  const { id } = req.params;
  const { name, artists, year, hidden } = req.body;
  try {
    if (!id) {
      return errorHandler(
        { status: 400, message: "Bad request :Id is required" },
        res
      );
    }
    const album = await AlbumModel.findById(id);
    if (!album) {
      return errorHandler({ status: 404, message: "Album not found" }, res);
    }
    album.name = name || album.name;
    album.artists = artists || album.artists;
    album.year = year || album.year;
    album.hidden = hidden || album.hidden;
    await album.save();
    return res.status(204).json({
      data: null,
      status: 204,
      message: "Album updated successfully",
      error: null,
    });
  } catch (err) {
    return errorHandler({ status: 500, message: "Internal server error" }, res);
  }
}

export async function deleteAlbum(req, res) {
  const { id } = req.params;
  try {
    if (!id) {
      return errorHandler(
        { status: 400, message: "Bad request :Id is required" },
        res
      );
    }
    const album = await AlbumModel.findById(id);
    if (!album) {
      return errorHandler({ status: 404, message: "Album not found" }, res);
    }
    await album.remove();
    return res.status(200).json({
      data: null,
      status: 200,
      message: "Album deleted successfully",
      error: null,
    });
  } catch (err) {
    return errorHandler({ status: 500, message: "Internal server error" }, res);
  }
}
