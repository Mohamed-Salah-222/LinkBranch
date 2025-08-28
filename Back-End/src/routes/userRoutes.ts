import express from "express";
import * as userController from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:username", userController.getPublicProfile);

router.put("/me/appearance", protect, userController.updateMyAppearance);

export default router;
