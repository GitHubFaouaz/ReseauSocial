import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonSubmitComments from "../utils/BouttonSubmitComments/ButtonSubmitComments";
import FormattedData from "../utils/FormattedData/FormattedData";
import { updatePost } from "../../actions/PostsAction";

const UpdatePost = ({ post, user }) => {
  const [isUpdate, setIsUpdate] = useState(true)
  const [updateTexte, setUpdateTexte] = useState('')
  const dispatch = useDispatch();
  const updateItem = async () => {


    try {
      if (post) {
        await dispatch(updatePost(post._id, user._id, updateTexte));
        // setIsUpdate(true)
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (

    isUpdate ? (
      <div>
        <span>{post.desc}</span><FormattedData post={post} /></div >) : (
      <>
        <textarea
          defaultValue={post.desc}
          onChange={(e) => setUpdateTexte(e.target.value)}
        />
        <ButtonSubmitComments texte={'Valider'} onClick={updateItem} />  {/*  validation de la mise a jour */}
      </>
    )


  );
};

export default UpdatePost;