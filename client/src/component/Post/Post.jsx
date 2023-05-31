import React, { useState } from "react";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id)); // on verifier deja si le user id est est deja dans le tableau des likes
  const [likes, setLikes] = useState(data.likes.length); // las listes des likes

  //manipulation des likes
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev); // fais linverse de false a true ou inversement
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1); //
  };
  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} //si image alors envoie  adresse suivant
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike} // quand on click on appele la fonction handleLike
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
