import { TrackModel } from "../../models/track.js";
import { errorHandler } from "../../helpers/errorHandler.js";
export async function getTracks(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const artist_id = req.query.artist_id;
    const album_id = req.query.album_id;
    const hidden = req.query.hidden;
    const filter = {};
    if (artist_id !== undefined) filter.artist_id = artist_id;
    if (album_id !== undefined) filter.album_id = album_id;
    if (hidden !== undefined) filter.hidden = hidden === "true";
    const tracks = await TrackModel.find(filter)
      .skip(offset)
      .limit(limit)
      .populate("artists")
      .populate("album")
      .select("name")
      .exec();
    const newTracks = tracks.map((track) => {
      return {
        track_id: track._id,
        name: track.name,
        artist_name: track.artists.map((artist) => artist.name),
        album_name: track.album.name,
        duration: track.duration,
        hidden: track.hidden,
      };
    });
    res.status(200).json(newTracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function getTrack(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return errorHandler(
        { statusCode: 400, message: "Bad request Id is required" },
        res
      );
    }
    const track = await TrackModel.findById(id);
    if (!track) {
      return errorHandler({ statusCode: 404, message: "Track not found" }, res);
    }
    res.status(200).json({
      data: {
        track_id: track._id,
        name: track.name,
        artist_name: track.artists.map((artist) => artist.name),
        album_name: track.album.name,
        duration: track.duration,
        hidden: track.hidden,
      },
      status: 200,
      error: null,
      message: "Track retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function addTrack(req, res) {
  try {
    let { name, duration, album_id, artist_id, hidden } = req.body;
    if (!name || !duration || !album_id || !artist_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!Array.isArray(artist_id)) {
      artist_id = [artist_id];
    }
    if (!Array.isArray(album_id)) {
      album_id = [album_id];
    }

    const track = await TrackModel.create({
      name,
      duration,
      album: album_id,
      artists: artist_id,
      hidden,
    });
    res.status(201).json({
      data: null,
      status: 201,
      message: "Track added successfully",
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function updateTrack(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return errorHandler(
        { statusCode: 400, message: "Bad request Id is required" },
        res
      );
    }
    let { name, duration, album_id, artist_id, hidden } = req.body;
    const track = await TrackModel.findById(id);
    if (!track) {
      return errorHandler({ statusCode: 404, message: "Track not found" }, res);
    }
    if (!Array.isArray(artist_id)) {
      artist_id = [artist_id];
    }
    if (!Array.isArray(album_id)) {
      album_id = [album_id];
    }
    track.name = name || track.name;
    track.duration = duration || track.duration;
    track.album = album_id || track.album;
    track.artists = artist_id || track.artists;
    track.hidden = hidden || track.hidden;
    await track.save();

    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function deleteTrack(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return errorHandler(
        { statusCode: 400, message: "Bad request Id is required" },
        res
      );
    }
    const track = await TrackModel.findByIdAndDelete(id);
    if (!track) {
      return errorHandler({ statusCode: 404, message: "Track not found" }, res);
    }
    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
