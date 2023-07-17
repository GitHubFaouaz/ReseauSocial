import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Le fait de renommer un import, comme dans l'exemple précédent, est couramment appelé "aliasing" ou "renommage d'importation
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; //Le fait de renommer un import, comme dans l'exemple précédent, est couramment appelé "aliasing" ou "renommage d'importation
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // vous pouvez renommer l'un des imports afin d'éviter les conflits de noms
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { likePost } from "../../api/PostsRequests";
import { useDispatch, useSelector } from "react-redux";
import { updateLikeDislike } from "../../actions/PostsAction";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
/*   const [liked, setLiked] = useState(data.likes.includes(user._id)); // on verifier deja si le user id est est deja dans le tableau des likes
  const [likes, setLikes] = useState(data.likes.length); // la listes des likes
  const [likes, setLikes] = useState([data.likes.length]); // la listes des likes
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  // manipulation des likes
  const handleLike = () => {
    console.log( data);
    likePost(data._id, user._id);
    setLiked((prev) => !prev); // fais linverse de false a true ou inversement
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1); //

  }; */

  // --------------------------------------------
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
   const [liked , setLiked] = useState(false)
    const [likes, setLikes] = useState([data.likes.length]);
   useEffect(()=> {
    console.log( data);
    data.likes.includes(user._id) ? setLiked(true): setLiked(false)
   },[data, data.likes,user._id]) 
   

  const Like  = ()=> {
    updateLikeDislike(data._id, user._id) 
    setLiked(true)

  }
  const unLike  = ()=> {
    
  }
  return (
    <div className="Post">
      <img // si image on l'affiche dans la page au centre
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} // on va chercher limage dans le back end grace au server et ensuite l'affichée en front end
        alt=""
      />

      <div className="postReact">
        <div
          className="container-like"
          // onClick={handleLike}
          onClick={Like}
          style={{ cursor: "pointer" }}
        >
          {liked === false ? (
              
            <FontAwesomeIcon
            onClick={Like}
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
        {/*   {liked ? (
            <FontAwesomeIcon
              icon={solidHeart}
              style={{ fontSize: "30px", color: "#02d6dd" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={regularHeart}
              style={{ fontSize: "30px", color: "#000" }}
            />
          )} */}
        </div>
        <FontAwesomeIcon
          icon={faComment}
          style={{ fontSize: "30px", cursor: "pointer" }}
        />
        <FontAwesomeIcon
          icon={faShare}
          style={{ fontSize: "30px", cursor: "pointer" }}
        />
      </div>

      <div className="container-Img-details">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="imgUser"
        />
        <div className="details">
          <div>
            <span>{user.lastname} </span>
            <span>{user.firstname}</span>
          </div>
          <span>
            <i>{likes}</i> likes
          </span>
          <span>{data.desc}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
