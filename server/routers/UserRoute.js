import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  UnFollowUser,
  updateUser,
  getAllUsers,
} from "../Controllers/UserController.js";
import authMiddleWare from "../Middleware/auth.js";

const router = express.Router();

// user
// router.get("/", getAllUsers); // accedé à tous les utilisateurs
// router.get("/:id", getUser); // accedé à un seul utilisateur
// router.put("/:id", authMiddleWare, updateUser); // modification d'un utilisateur
// router.delete("/:id", authMiddleWare, deleteUser); // suppresion d'un utilisateur
// router.put("/:id/follow", authMiddleWare, followUser);
// router.put("/:id/unfollow", authMiddleWare, UnFollowUser);
// export default router;
router.get("/", getAllUsers); // accedé à tous les utilisateurs
router.get("/:id", getUser); // accedé à un seul utilisateur
router.put("/:id", updateUser); // modification d'un utilisateur
router.delete("/:id", deleteUser); // suppresion d'un utilisateur
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", UnFollowUser);
export default router;
