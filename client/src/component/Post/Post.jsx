import React, { memo, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Le fait de renommer un import, comme dans l'exemple précédent, est couramment appelé "aliasing" ou "renommage d'importation
import { faHeart as solidHeart, faPenNib } from "@fortawesome/free-solid-svg-icons"; // vous pouvez renommer l'un des imports afin d'éviter les conflits de noms
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import { likePost } from "../../api/PostsRequests";
import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "../../actions/PostsAction";
import CommentsPost from "../CommentsPost/CommentsPost";
import ButtonSubmitComments from "../utils/BouttonSubmitComments/ButtonSubmitComments";
import { useUserContext } from "../utils/AppContext/AppContext";
import LikeButton from "./LikeButton";
import FormattedData from "../utils/FormattedData/FormattedData";


// je recupère en props les informations envoyées du composants Posts 
// const Post = ({post,user}) => {
const Post = ({ post }) => {

  const { user } = useUserContext();
  const [comment, setComment] = useState(false)
  const [isUpdate, setIsUpdate] = useState(true)
  const [updateTexte, setUpdateTexte] = useState('')
  const dispatch = useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  // // Utilisation de useMemo pour créer des versions stables des props
  // const memoizedData = useMemo(() => post, [post]);
  // const memoizedUser = useMemo(() => user, [user]);
  // console.log('dataProps',  post); // post du post 
  // mise a jour du post 
  const updateItem = async () => {
    // console.log('user._id: ', user._id);
    // console.log('updateTexte: ', updateTexte);
    // console.log( ' updatedPost._id(postId)' , post._id);

    try {
      if (post) {
        await dispatch(updatePost(post._id, user._id, updateTexte));
        // setIsUpdate(true)
      }
    } catch (error) {
      //  console.error(error);
    }
  }

  const buttonDeletePost = () => {
    dispatch(deletePost(post._id, user._id))
    //  console.log( 'userProps' , user);// post du user 
    //  console.log('dataProps',  post); // post du post 
  }


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

            {isUpdate ? (<div> <span>{post.desc}</span><FormattedData post={post} /></div>) : (
              <>
                <textarea
                  defaultValue={post.desc}
                  onChange={(e) => setUpdateTexte(e.target.value)}
                />
                <ButtonSubmitComments texte={'Valider'} onClick={updateItem} />  {/*  validation de la mise a jour */}
              </>
            )}



          </div>

        </div>
        <img // si image on l'affiche dans la page au centre
          src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""} // on va chercher limage dans le back end grace au server et ensuite l'affichée en front end
          alt="imgPost"
        />

        {/* le button update n'apparait que pour celui qui a posté  */}
        {post.userId === user._id && (
          <div className="containe-updateDelecteComment">

            <FontAwesomeIcon icon={faPenNib} style={{ cursor: "pointer" }} onClick={() => setIsUpdate(!isUpdate)} />
            <FontAwesomeIcon icon={faTrashCan} style={{ cursor: "pointer" }} onClick={buttonDeletePost} /*on click sur la croix limage disparait elle est nul  */// onClick={() => setImage(null)} />
            />
          </div>
        )}

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
          // <CommentsPost post={post}/>

        )}

      </div>
    </>
  );
};





export default memo(Post);

