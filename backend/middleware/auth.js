import jwt from "jsonwebtoken";
import User from "../models/user.js";

export default async (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (!header) return res.status(401).json({ msg: "No token provided" });

    const token = header.replace("Bearer ", "").trim();

    const secret = process.env.JWT_SECRET || "8jshd7#ks82L@19hds8!la0";
    const decoded = jwt.verify(token, secret);

    // Support ALL possible token formats:
    const userId = decoded.id || decoded._id || decoded.user?.id;

    if (!userId) {
      return res.status(401).json({ msg: "Invalid token payload" });
    }

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    req.user = user; // Attach full user object
    next();

  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
