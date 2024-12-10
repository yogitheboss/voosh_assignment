import { UserModel } from "../../models/user.js";
import { errorHandler } from "../../helpers/errorHandler.js";
import { separateName } from "../../helpers/separateName.js";
import { blackListToken, issueToken } from "../../middlewares/auth.js";
import bcrypt from "bcrypt";
export const signUp = async (req, res) => {
  const { email, password, role, name } = req.body;
  try {
    if (!password) {
      return errorHandler(
        { message: `Bad Request, Reason:${email}`, statusCode: 400 },
        res
      );
    }
    if (!email) {
      return errorHandler(
        { message: `Bad Request, Reason:${password}`, statusCode: 400 },
        res
      );
    }
    // get if there are no user in db at all
    const user = await UserModel.find({ email: email });
    if (user.length) {
      return errorHandler(
        { message: "User already exists", statusCode: 409 },
        res
      );
    }
    const totalUserCount = await UserModel.countDocuments();
    const hash = await bcrypt.hash(password, 10);
    const name = separateName(email);
    let newUser = null;
    if (totalUserCount === 0) {
      newUser = new UserModel({
        email,
        password: hash,
        name,
        role: "admin",
      });
      await newUser.save();
    } else {
      newUser = new UserModel({
        email,
        password: hash,
        name,
      });
      await newUser.save();
    }
    const userToSend = {
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      _id: newUser._id,
    };
    const token = await issueToken(userToSend);
    return res.status(200).json({
      data: null,
      token,
      status: 200,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    return errorHandler(
      {
        message: "Internal Server error",
        statusCode: 500,
      },
      res
    );
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password) {
      return errorHandler(
        { message: `Bad Request, Reason:${email}`, statusCode: 400 },
        res
      );
    }
    if (!email) {
      return errorHandler(
        { message: `Bad Request, Reason:${password}`, statusCode: 400 },
        res
      );
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return errorHandler({ message: "User not found", statusCode: 404 }, res);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return errorHandler(
        { message: "Invalid password", statusCode: 401 },
        res
      );
    }
    const userToSend = {
      email: user.email,
      name: user.name,
      role: user.role,
      _id: user._id,
    };
    const token = await issueToken(userToSend);
    return res.status(200).json({ ...userToSend, token, status: 200 });
  } catch (err) {
    console.error(err);
    console.log(err);
    return errorHandler(
      {
        message: "Internal Server error",
        statusCode: 500,
      },
      res
    );
  }
};

export const logout = async (req, res) => {
  blackListToken(req);
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    console.log(err);
    return errorHandler(
      {
        message: "Internal Server error",
        statusCode: 500,
      },
      res
    );
  }
};
