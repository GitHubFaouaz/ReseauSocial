import React, { memo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import CommentsPost from "./CommentsPost";
import { useUserContext } from "../utils/AppContext/AppContext";
import LikeButton from "./LikeButton";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";


// je recupère en props les informations envoyées du composants Posts 

const Post = ({ post }) => {
  const { user } = useUserContext();
  const [comment, setComment] = useState(false)
  const [isUpdate, setIsUpdate] = useState(true)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log('dataProps',  post); // post du post 

  return (
    <>
      <div className="Post"     >

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
              <span>{user.firstname}</span>
            </div>
            <UpdatePost post={post} user={user} isUpdate={isUpdate} />
          </div>

        </div>
        <img // si image on l'affiche dans la page au centre
          src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""} // on va chercher limage dans le back end grace au server et ensuite l'affichée en front end
          alt="imgPost"
        />

        {/* le button update n'apparait que pour celui qui a posté  */}
        <DeletePost post={post} user={user} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />

        <div className="postReact">
          <FontAwesomeIcon
            icon={faComment}
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={() => setComment(!comment)}
          />

          <LikeButton post={post} user={user} />

          <FontAwesomeIcon
            icon={faShare}
            style={{ fontSize: "30px", cursor: "pointer" }}
          />
        </div>
        {/* pour afficher les commantaires du post */}
        {comment && (
          <CommentsPost />
          // <CommentsPost post={post} />
          //     <p>abdallah</p>

        )}

      </div>
    </>
  );
};





export default memo(Post);

