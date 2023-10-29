import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonSubmitComments from "../utils/BouttonSubmitComments/ButtonSubmitComments";
import { updatePost } from "../../actions/PostsAction";

const UpdatePost = ({ post, user, isUpdate }) => {
  const [updateTexte, setUpdateTexte] = useState('')
  const dispatch = useDispatch();
  const updateItem = async () => {
    try {
      if (post) {
        await dispatch(updatePost(post._id, user._id, updateTexte));
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (

    isUpdate ? (
      <div>
        <span>{post.desc}</span>
      </div >) : (
      <>
        <textarea
          defaultValue={post.desc}
          onChange={(e) => setUpdateTexte(e.target.value)}
        />
        {/*  validation de la mise a jour  du post*/}
        <ButtonSubmitComments texte={'Valider'} onClick={updateItem} />
      </>
    )


  );
};

export default UpdatePost;