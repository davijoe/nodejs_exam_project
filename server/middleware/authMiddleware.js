import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
  const crypto = require('crypto');
  const jwtSecret = crypto.randomBytes(64).toString('hex');
  console.log(jwtSecret);
  // Example output: 'f3b0a62d4e8a7b6db484fcb51fdaab02467db93fdd03bd4ba5c8e6edcc967e9b'
};

export default auth;
