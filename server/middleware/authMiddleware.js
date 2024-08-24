import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(
      token,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNhMmQwNWFkZGNjZTkxYzI3NzRkODMiLCJpYXQiOjE3MjQ1MjU4Mjl9.cx8YZDEWb0QvBw1wmyOIR1SwWLte8QfugR1e7n56CY8"
    );
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.user();
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

export default auth;
