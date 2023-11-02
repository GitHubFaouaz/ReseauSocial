import PostModel from "../models/postModel.js";
// import UserModel from "../models/userModel.js";
import mongoose from "mongoose";
import axios from 'axios';



export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};



export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id); // _id du post 
    res.status(200).json(post);
    // res.status(200).json(post).sort({createdAt : -1});// pour afficher les plus rescent post ou inverser en css lordre 
  } catch (error) {
    res.status(500).json(error);
  }
};


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
  // lecture de la base de donné
  PostModel.find((err, docs) => {
      //envoi moi le docs (la data) ou s'il ya erreur envoi
      if (!err) res.send(docs);
      else console.log("Error to get data : " + err);
    })
    .sort({ createdAt: -1 }); //.sort({createdAt: -1 }); permet d'afficher la liste du plus recent au plus ancien
};

export const commentPost = (req, res) => {
  
  const postId = req.params.id; //id du post et non du commentaire
  // const bodyCorps =  req.body
  // console.log('bodyCorps' ,bodyCorps);
  
  try {
    return PostModel.findByIdAndUpdate( 
   // on point dabord sur le post
   postId,
   
      // postId
       {$push: {
          comments: {
            commenterId: req.body.commenterId,//id de celui qui post  comme dans le model
            // commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),//qui sera convertie en front 
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

export const editCommentPost = (req, res) => {
  
  const postId = req.params.id; 
  // const bodyCorps =  req.body
  // console.log('bodyCorps' ,bodyCorps); 

  try {
    return PostModel.findById(postId, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId) // on cherche le id du commentaire a editer(commentId en front end) qui est equal a comment._id(._id:objectId) dans les posts
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const  deleteCommentPost = (req, res) => {
    
  const postId = req.params.id; //id du post et non du commentaire

  try {
    return PostModel.findByIdAndUpdate(
         // on point dabord sur post pour supprimer un commentaire dans le post
     postId,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,// on retire le commentaire qui a l'id 
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};


