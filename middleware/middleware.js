const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const isAdmin = async (request, response, next) => {
  const authHeader = request.headers["authorization"];
  if (!authHeader) {
    response.status(400).json({ message: "Authorization Header Missing" });
  }
  const jwtToken = authHeader.split(" ")[1];
  jwt.verify(jwtToken, JWT_SECRET, async (error, payload) => {
    try {
      if (error) {
        response.status(400).json({ message: "Invalid jwtToken" });
      } else {
        const { userId } = payload;
        const user = await User.findOne({ _id: userId });
        if (!user || user.isAdmin !== true) {
          return response.status(400).json({ message: "Access Denied" });
        }
        request.user = user;
        next();
      }
    } catch (error) {
      console.error("Error in isAdmin middleware:", error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  });
};

const isUser = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { isAdmin, isUser };
