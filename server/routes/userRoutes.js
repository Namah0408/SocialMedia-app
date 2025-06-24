import express from "express";
import {
  getUserProfile,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", getUserProfile);
router.post("/:id/follow", authMiddleware, followUser);
router.delete("/:id/unfollow", authMiddleware, unfollowUser);

export default router;