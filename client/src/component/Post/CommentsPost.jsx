import React, { useState } from 'react';
import ButtonSubmitComments from '../utils/BouttonSubmitComments/ButtonSubmitComments';
import { useUserContext } from "../utils/AppContext/AppContext";
import { useDispatch, useSelector } from 'react-redux';
const CommentsPost = ({ post }) => {
  const [text, setText] = useState();
  const { user } = useUserContext();
  const { posts } = useSelector((state) => state.postReducer);
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleComments = () => { }
  return (

    <div className="containe-postComment">
      < div className="commentsLength" >
        {posts.map((post) => (
          post.comments.map((comment) => {
            console.log("textCommentaire : ", comment.text)
            console.log('comment', comment);
            return (
              <div className="containe-imgName" key={comment._id}>
                <img src={
                  user.profilePicture
                    ? serverPublic + user.profilePicture
                    : serverPublic + "defaultProfile.png"
                } alt="" />
                <div className="containe-nameAndText">
                  <span>{user.firstname}</span>
                  <p>{comment.text}</p></div>

              </div >
            )
          })

        ))}


      </div >



      <div className="containe-inputComments">
        <input type='text' placeholder="Laissez un commentaire" />
        <ButtonSubmitComments texte={'Envoyer'} />

      </div>

    </div >

  );
};

export default CommentsPost;