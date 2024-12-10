import jwt from "jsonwebtoken";
// import redis from "redis";
import { configDotenv } from "dotenv";
configDotenv();
// const redisClient = redis.createClient();
const _SecretToken = process.env.JWT_SECRET;
const _TokenExpiryTime = "24h";
const tokenBlackList = [];
export const authorize = function (roles = []) {
  if (!Array.isArray(roles)) roles = [roles];

  return (req, res, next) => {
    function sendError(msg) {
      return req.res.status(403).json({
        message: msg,
      });
    }

    try {
      const token =
        req.headers["Authorization"] || req.headers["authorization"];

      if (!token) return sendError("Error: User Not Authorized"); // Token does not exist
      if (token.indexOf("Bearer") !== 0)
        return sendError("Error: User Not Authorized"); // Wrong format

      const tokenString = token.split(" ")[1];
      if (tokenBlackList.includes(tokenString))
        return sendError("Error: User Not Authorized"); // Token is blacklisted

      jwt.verify(tokenString, _SecretToken, (err, decodedToken) => {
        if (err) {
          console.log(err);
          return sendError("Error: User Not Authorized");
        }
        if (!decodedToken.role) return sendError("Error: User Not Authorized");
        const userRole = decodedToken.role.toLowerCase();
        // if user is admin then allow all
        if (userRole === "admin") {
          req.user = decodedToken;
          return next();
        }
        // if require user access and user has role of user or editor then allow
        if (roles.includes("user") && ["user", "editor"].includes(userRole)) {
          req.user = decodedToken;
          return next();
        }

        // if require editor access and user has role of editor then allow
        if (roles.includes("editor") && ["editor"].includes(userRole)) {
          req.user = decodedToken;
          return next();
        }

        if (roles.indexOf(userRole) === -1)
          return sendError("Error: Forbidden Access");

        req.user = decodedToken;
        next();
      });
    } catch (err) {
      console.log(err);
      return req.res.send.status(500).json({ message: "Server Error Occured" });
    }
  };
};

export const issueToken = function (user) {
  console.log("importatn", _SecretToken, _TokenExpiryTime);
  var token = jwt.sign({ ...user, iss: "Node-Auth" }, _SecretToken, {
    expiresIn: _TokenExpiryTime,
  });
  return token;
};

export const blackListToken = function (req) {
  const token = req.headers["authorization"] || req.headers["Authorization"];
  if (!token) return;
  const tokenString = token.split(" ")[1];
  tokenBlackList.push(tokenString);
};

// export const blackListToken = async function (req) {
//   const token =
//     req.headers["authorization"]?.split(" ")[1] ||
//     req.headers["Authorization"]?.split(" ")[1];
//   if (!token) return;
//   const decoded = jwt.decode(token);
//   const expiry = decoded.exp;
//   if (!expiry) return;
//   if (!redisClient.isOpen) {
//     await redisClient.connect();
//   }
//   await redisClient.setEx(
//     token,
//     expiry - Math.floor(Date.now() / 1000),
//     "blacklisted",
//     (error) => {
//       if (error) {
//         throw Error("Error: Token could not be blacklisted");
//       }
//     }
//   );
// };

export const Roles = {
  User: ["user"],
  Admin: ["admin"],
  All: ["user", "admin"],
};
