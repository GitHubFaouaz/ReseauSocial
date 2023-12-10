import React, { useState } from "react";
import ButtonSubmitComments from "../utils/BouttonSubmitComments/ButtonSubmitComments";
import { useDispatch, useSelector } from "react-redux";
import FormattedData from "../utils/FormattedData/FormattedData";
import {
  addCommentPost,
  getPost,
  getTimelinePosts,
} from "../../actions/PostsAction";

const CommentsPost = ({ post, user }) => {
  const [text, setText] = useState();

  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // const handleComments = async (e) => {
  const handleComments = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addCommentPost(post._id, user.id, text));
      // dispatch(getTimelinePosts());
    }
    // dispatch(getPost(post._id));
    setText("");
  };
  return (
    <div className="containe-postComment">
      <div className="commentsLength">
        {post.comments.map((comment) => {
          // console.log("textCommentaire : ", comment.text)
          // console.log('comment', comment);
          return (
            <div className="containe-imgName" key={comment._id}>
              <img
                src={
                  user.profilePicture
                    ? serverPublic + user.profilePicture
                    : serverPublic + "defaultProfile.png"
                }
                alt=""
              />
              <div className="containe-nameAndText">
                <span>{user.firstname}</span>
                <span>{comment.text}</span>
              </div>
              <p>
                <FormattedData post={comment.timestamp} />
              </p>
            </div>
          );
        })}
      </div>

      <div className="containe-inputComments">
        <input
          type="text"
          placeholder="Laissez un commentaire"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <ButtonSubmitComments texte={"Envoyer"} onClick={handleComments} />
      </div>
    </div>
  );
};

export default CommentsPost;
