import { UserModel } from "../../models/user.js";
import { errorHandler } from "../../helpers/errorHandler.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {
    // Extract query parameters with defaults
    const limit = parseInt(req.query.limit) || 5; // Default limit to 5
    const offset = parseInt(req.query.offset) || 0; // Default offset to 0
    const role = req.query.role || null; // Optional role filter

    // Build the query filter
    const filter = {};
    if (role) {
      filter.role = role; // Filter by role (e.g., Editor or Viewer)
    }

    // Fetch users from the database with pagination and filtering
    let users = await UserModel.find(filter)
      .select({
        _id: 1,
        email: 1,
        role: 1,
        createdAt: 1,
      })
      .skip(offset) // Skip the first 'offset' records
      .limit(limit) // Limit the results to 'limit' records
      .exec(); // Execute the query

    users = users
      .map((user) => user.toObject())
      .map((user) => {
        return {
          user_id: user._id,
          email: user.email,
          role: user.role,
          created_at: user.createdAt,
        };
      });
    // Return the users with a 200 status code
    return res.status(200).json({
      message: "Users fetched successfully",
      users: users,
      status: 200,
      error: null,
    });
  } catch (err) {
    console.error(err);
    console.error(err);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

export const addUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return errorHandler(
        {
          message: "Bad Request",
          statusCode: 400,
        },
        res
      );
    }
    if (!["editor", "user"].includes(role)) {
      return errorHandler(
        {
          message: "Bad Request",
          statusCode: 400,
        },
        res
      );
    }
    const userExists = await UserModel.find({ email }).exec();
    if (userExists.length > 0) {
      return errorHandler(
        {
          message: "User already exists",
          statusCode: 409,
        },
        res
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userName = email.split("@")[0];
    const user = new UserModel({
      email,
      password: hashedPassword,
      role,
      name: userName,
    });
    await user.save();
    return res.status(201).json({
      message: "User created successfully",
      status: 201,
      data: null,
      error: null,
    });
  } catch (err) {
    console.error(err);
    console.error(err);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return errorHandler(
        {
          message: "Bad Request",
          statusCode: 400,
        },
        res
      );
    }
    const deletedUser = await UserModel.findByIdAndDelete(userId).exec();
    if (!deletedUser) {
      return errorHandler(
        {
          message: "User not found",
          statusCode: 404,
        },
        res
      );
    }
    return res.status(200).json({
      message: "User deleted successfully",
      status: 200,
      data: null,
      error: null,
    });
  } catch (err) {
    console.error(err);
    console.error(err);
    return res.status(500).json({ message: "Server error occurred" });
  }
};

export const updatePassword = async (req, res) => {
  const { old_password, new_password } = req.body;
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return errorHandler({ message: "User not found", statusCode: 404 }, res);
    }
    const isMatch = await bcrypt.compare(old_password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    user.password = await bcrypt.hash(new_password, 10);
    await user.save();
    return res.status(204).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    console.error(err);
    return res.status(500).json({ message: "Server error occurred" });
  }
};
