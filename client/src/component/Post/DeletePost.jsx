import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from "../../actions/PostsAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart, faPenNib } from "@fortawesome/free-solid-svg-icons"; // vous pouvez renommer l'un des imports afin d'éviter les conflits de noms



const DeletePost = ({ post, user, setIsUpdate, isUpdate }) => {
  const dispatch = useDispatch();
  const buttonDeletePost = () => {
    dispatch(deletePost(post._id, user._id))
    //  console.log( 'userProps' , user);// post du user 
    //  console.log('dataProps',  post); // post du post 
  }
  return (
    <> {post.userId === user._id && (
      <div className="containe-updateDelecteComment">

        <FontAwesomeIcon icon={faPenNib} style={{ cursor: "pointer" }} onClick={() => setIsUpdate(!isUpdate)} />
        {/* <FontAwesomeIcon icon={faPenNib} style={{ cursor: "pointer" }} onClick={toggleIsUpdate} /> */}
        <FontAwesomeIcon icon={faTrashCan} style={{ cursor: "pointer" }} onClick={buttonDeletePost}
        />
      </div>
    )}
    </>

  );
};

export default DeletePost;