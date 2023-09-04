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
    const post = await PostModel.findById(id); // _id du post 
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id; // id du post 
  const { userId } = req.body; // l'ID de l'utilisateur à partir du corps de la requête req.body

  // console.log('userId'+ userId);
  // console.log('postId' + postId);

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {// 64bc584b948147daea3313c5 === 64bc584b948147daea3313c5
      await post.updateOne({ $set: req.body });
       // Récupérer les nouvelles données du post après la mise à jour
      const updatedPost = await PostModel.findById(postId);
      //  console.log('updatedPost server', updatedPost);


      res.status(200).json(updatedPost);
      // res.status(200).json("Message mis à jour !" );
    } else {
      res.status(403).json("Authentification échouée");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  
  
  try {
    const post = await PostModel.findById(id);
    // besoin du id pour mettre a jour le store grace filter en front end 
    const  deletedPostId = post._id 

  
    // console.log('postIdBack ' ,id);
    // console.log('userIdBack' , userId);
    // console.log('postBack' + post);

    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json({ message : " Message supprimé" , postId : deletedPostId} ); 
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
  // console.log( 'userIdBack', userId );
  // console.log('PostIdBack ' , id );
  try {
    const post = await PostModel.findById(id); // on trouve le post grace au id du post 
    // console.log( 'post' , post);
    if (post.likes.includes(userId)) {   //si l'utilisateur dans le tableau des likes on l'enlève 
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({message : "Message détesté" , id : post._id , userId : post.userId});
     

    } else {
      await post.updateOne({ $push: { likes: userId } }); // sinon on on met son id dans le tableau des likes 
      res.status(200).json({message : "Message aimé", id : post._id , userId : post.userId});


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


