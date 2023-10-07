import express from "express";
import {
  commentPost,
  createPost,
  deleteCommentPost,
  deletePost,
  editCommentPost,
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
// router.get("/:id/timeline", getTimelinePosts);
router.get("/", getTimelinePosts);
router.put("/comment-post/:id",commentPost)
router.put("/edit-comment-post/:id",editCommentPost);
router.delete('/delete-comment-post/:id', deleteCommentPost);
// router.put('/delete-comment-post/:id', deleteCommentPost);
export default router;
