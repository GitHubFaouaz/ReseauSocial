import PostModel from "../models/postModel.js";
// import UserModel from "../models/userModel.js";
import mongoose from "mongoose";
import axios from 'axios';

// creating a post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Message mis à jour !");
    } else {
      res.status(403).json("Authentification échouée");
    }
  } catch (error) {}
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Message supprimé");
    } else {
      res.status(403).json("Action interdite");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id); // on trouve le post grace au id du post 
    if (post.likes.includes(userId)) {   //si l'utilisateur dans le tableau des likes on l'enlève 
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Message détesté");
      // res.status(200).json({ message: "Message détesté", likes: post.likes });
    } else {
      await post.updateOne({ $push: { likes: userId } }); // sinon on on met son id dans le tableau des likes 
      res.status(200).json("Message aimé");
      // res.status(200).json({ message: "Message aimé", likes: post.likes });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts  A REVOIRE.............
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


export const getData = async (req, res) => {
  try {
    const response = await axios.get('https://sortiraujourdhui.fr/api/?u=Faouaz&k=e607f5ff4b1fe57bdfd1c552b3add021');
    const data = response.data;
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};