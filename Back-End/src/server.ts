import "dotenv/config";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";

const app: express.Application = express();
const port = process.env.PORT || 3000;

import authRoutes from "./routes/authRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.error("DATABASE URI IS NOT DEFINED IN .env FILE");
  process.exit(1);
}

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/users", userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server!" });
});

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DATABASE CONNECTION FAILED:", err);
    process.exit(1);
  });
