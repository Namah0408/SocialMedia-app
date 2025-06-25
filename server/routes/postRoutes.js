import express from "express";
import { createPost, getFeedPosts, deletePost } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { toggleLike, addComment } from "../controllers/postController.js";

const router = express.Router();

router.get("/feed", getFeedPosts);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.post("/:id/like", authMiddleware, toggleLike);
router.post("/:id/comment", authMiddleware, addComment);

export default router;