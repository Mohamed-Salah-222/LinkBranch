import express from "express";
import * as linkController from "../controllers/linkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, linkController.getMyLinks).post(protect, linkController.createLink);

router.put("/reorder", protect, linkController.reorderLinks);

router.route("/:linkId").put(protect, linkController.updateLink).delete(protect, linkController.deleteLink);

router.patch("/:linkId/click", linkController.trackClick);

export default router;
