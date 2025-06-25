import express from "express";
import {
  getUserProfile,
  followUser,
  unfollowUser,
  uploadAvatar,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js"; // ✅ import here

const router = express.Router();

router.get("/:id", authMiddleware, getUserProfile);
router.post("/:id/follow", authMiddleware, followUser);
router.post("/:id/unfollow", authMiddleware, unfollowUser);

// ✅ Avatar upload
router.post("/:id/avatar", authMiddleware, upload.single("avatar"), uploadAvatar);

export default router;