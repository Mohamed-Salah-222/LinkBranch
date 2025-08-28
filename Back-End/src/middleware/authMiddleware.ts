import jwt from "jsonwebtoken";
import { type ExpressHandler } from "../types.js";

export const protect: ExpressHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Access denied. No or invalid token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET environment variable is not defined");
    res.status(500).json({ message: "Server configuration error." });
    return;
  }

  try {
    const decodedPayload = jwt.verify(token, jwtSecret);

    if (typeof decodedPayload === "object" && decodedPayload !== null) {
      req.user = decodedPayload as { id: string };
      next();
    } else {
      res.status(400).json({ message: "Invalid token format." });
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("JWT verification error:", error.message);
    }
    res.status(400).json({ message: "Invalid token." });
  }
};
