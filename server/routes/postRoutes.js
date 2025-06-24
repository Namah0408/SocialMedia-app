import express from "express";
import { createPost, getFeedPosts, deletePost } from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import React from "react";

const router = express.Router();

router.get("/feed", getFeedPosts);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
