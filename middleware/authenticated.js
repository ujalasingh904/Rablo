import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protect = async (req, res, next) => {
  try {
    if (!req.cookies) {
      return res.status(401).json({ error: "Unauthorized --- NO COOKIES PROVIDED" });
    }

    const token = req.cookies.access_token;

    if (!token)
      return res.status(401).json({ error: "Unauthorized --- NO TOKEN PROVIDED" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ error: "INVALID TOKEN" });

    const newUser = await User.findById(decoded.id).select("-password");

    if (!newUser)
      return res.status(401).json({ error: "Unauthorized --- NO USER FOUND" });
    req.user = newUser;
    next();
  } catch (error) {
    console.log("error in protectRoute middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


