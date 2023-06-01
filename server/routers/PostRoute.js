import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../controllers/PostController.js";
// import authMiddleWare from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost); // ex :PUT /posts/6477a1fa15af68697fbbc565/like 200 19 - 283.901 ms
router.get("/:id/timeline", getTimelinePosts);

export default router;
