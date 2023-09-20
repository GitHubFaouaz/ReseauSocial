import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Le fait de renommer un import, comme dans l'exemple précédent, est couramment appelé "aliasing" ou "renommage d'importation
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { LikePost, unLikePost } from "../../actions/PostsAction";

// const LikeButton = ({ post, user, initialLiked }) => {
const LikeButton = ({ post, user}) => {
  // const [liked, setLiked] = useState(initialLiked);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=> {
    if(post.likes.includes(user._id)) setLiked(true)
     else setLiked(false) 
  },[post.likes,user._id])

  const like = ()=> {
    dispatch(LikePost(post._id,user._id))
 
    setLiked(true)
 }
 
 const unLike = ()=> {
   dispatch(unLikePost(post._id,user._id))
   setLiked(false) 
 }

    return <div
    className="container-like"

    style={{ cursor: "pointer" }}
  >
    {liked === false ? (
        
      <FontAwesomeIcon
      onClick={like}
      icon={regularHeart}
      style={{ fontSize: "30px", color: "#000" }}
    />
    ) : (
      <FontAwesomeIcon
      onClick={unLike}
      icon={solidHeart}
      style={{ fontSize: "30px", color: "#02d6dd" }}
    />
    )}
  
      <span>
    {post.likes.length}
    </span>
  </div>
};

export default LikeButton;
