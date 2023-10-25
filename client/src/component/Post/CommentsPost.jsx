import React, { useState } from 'react';
import ButtonSubmitComments from '../utils/BouttonSubmitComments/ButtonSubmitComments';
import { useUserContext } from "../utils/AppContext/AppContext";
import { useDispatch, useSelector } from 'react-redux';
const CommentsPost = ({ post }) => {
  const [text, setText] = useState();
  const { user } = useUserContext();
  // const { posts } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleComments = () => { }
  return (
    <div className="containe-postComment" >
      <div className="commentsLength">
        <div className="containe-imgName">
          <img src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          } alt="" />
          <div>
            <span>nom photo</span>
            <p className="comment">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, necessitatibus quidem? Illum, sunt repellendus. Quos reiciendis vitae ex, ipsam harum architecto perferendis optio ab debitis deserunt officiis adipisci eius odio!</p>
          </div>
          {/* {posts.comments.text.map((comment) => {
              console.log("text", comment);
              return (
                <p>{comment}</p>
              )
          
            })} */}
        </div>
        <div className="containe-imgName">
          <img src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          } alt="" />
          <div>
            <span>mounirrrrr</span>
            {/* <p className="comment">il abuse la </p> */}
            {post.desc.map((comment) => {
              console.log("text", comment);
              return (
                <p>{comment}</p>
              )

            })}
          </div>

        </div>

      </div>

      <div className="containe-inputComments">
        <input type='text' placeholder="Laissez un commentaire" />
        <ButtonSubmitComments texte={'Envoyer'} />

      </div>

    </div>
  );
};

export default CommentsPost;