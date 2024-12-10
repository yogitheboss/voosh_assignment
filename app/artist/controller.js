import { errorHandler } from "../../helpers/errorHandler.js";
import { ArtistModel } from "../../models/artist.js";
export const getArtist = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return errorHandler(
        {
          status: 400,
          message: "Id is required",
        },
        res
      );
    }
    const artist = await ArtistModel.findById(id);
    if (!artist) {
      return errorHandler(
        {
          status: 404,
          message: "Artist not found",
        },
        res
      );
    }
    return res.status(200).json({
      data: {
        artist_id: artist._id,
        name: artist.name,
        grammy: artist.grammy,
        hidden: artist.hidden,
      },
      message: "Artist retrieved successfully",
      error: null,
      status: 200,
    });
  } catch (err) {
    return errorHandler(
      {
        status: 500,
        message: "Internal server error",
      },
      res
    );
  }
};

export const getArtists = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const grammy = req.query.grammy;
    const hidden = req.query.hidden;
    const filter = {};
    if (grammy !== undefined) filter.grammy = parseInt(grammy); // Convert "0" or "10" to boolean
    if (hidden !== undefined) filter.hidden = hidden === "true"; // Convert "true"/"false" to boolean
    // Fetch the filtered data with pagination
    let artists = await ArtistModel.find(filter)
      .skip(offset) // Skip the first 'offset' records
      .limit(limit) // Limit the results to 'limit' records
      .exec();
    artists = artists.map((artist) => {
      return {
        artist_id: artist._id,
        name: artist.name,
        grammy: artist.grammy,
        hidden: artist.hidden,
      };
    });
    res.status(200).json({
      data: artists,
      status: 200,
      message: "Artists retrieved successfully",
      error: null,
    });
  } catch (err) {
    return errorHandler(
      {
        status: 500,
        message: "Internal server error",
      },
      res
    );
  }
};

export const addArtist = async (req, res) => {
  const { name, grammy } = req.body;
  try {
    if (!name) {
      return errorHandler(
        {
          status: 400,
          message: "Name is required",
        },
        res
      );
    }
    const artist = new ArtistModel({ name, grammy });
    await artist.save();
    return res.status(201).json({
      data: null,
      message: "Artist created successfully",
      status: 201,
      error: null,
    });
  } catch (err) {
    return errorHandler(
      {
        status: 500,
        message: "Internal server error",
      },
      res
    );
  }
};

export const updateArtist = async (req, res) => {
  const { id } = req.params;
  const { name, grammy, visibility } = req.body;
  try {
    if (!id) {
      return errorHandler(
        {
          status: 400,
          message: "Bad Request :Id is required",
        },
        res
      );
    }
    const artist = await ArtistModel.findById(id);
    if (!artist) {
      return errorHandler(
        {
          status: 404,
          message: "Artist not found",
        },
        res
      );
    }
    if (name) artist.name = name;
    if (grammy) artist.grammy = grammy;
    if (visibility) artist.hidden = visibility;
    await artist.save();
    return res.status(204).json({
      data: null,
      message: "Artist Updated Successfully",
      status: 204,
    });
  } catch (err) {
    return errorHandler(
      {
        status: 500,
        message: "Internal server error",
      },
      res
    );
  }
};

export const deleteArtist = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return errorHandler(
        {
          status: 400,
          message: "Bad Request Id is required",
        },
        res
      );
    }
    const artist = await ArtistModel.findById(id);
    if (!artist) {
      return errorHandler(
        {
          status: 404,
          message: "Artist not found",
        },
        res
      );
    }
    await artist.remove();
    return res.status(204).json({
      data: {
        id: artist._id,
      },
      message: "Artist Deleted Successfully",
      status: 204,
      error: null,
    });
  } catch (err) {
    return errorHandler(
      {
        status: 500,
        message: "Internal server error",
      },
      res
    );
  }
};
