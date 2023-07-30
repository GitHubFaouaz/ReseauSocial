import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Le fait de renommer un import, comme dans l'exemple précédent, est couramment appelé "aliasing" ou "renommage d'importation
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; //Le fait de renommer un import, comme dans l'exemple précédent, est couramment appelé "aliasing" ou "renommage d'importation
import { faHeart as solidHeart, faPenNib } from "@fortawesome/free-solid-svg-icons"; // vous pouvez renommer l'un des imports afin d'éviter les conflits de noms
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { likePost } from "../../api/PostsRequests";
import { useDispatch, useSelector } from "react-redux";
import { updateLikeDislike, updatePost } from "../../actions/PostsAction";
import CommentsPost from "../CommentsPost/CommentsPost";
import ButtonSubmitComments from "../utils/BouttonSubmitComments/ButtonSubmitComments";


const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts } = useSelector((state) => state.postReducer);
  // console.log('posts' , posts);
  // console.log(user);
  const [comment,setComment] = useState(false)
  const [isUpdate , setIsUpdate] = useState(true)
  const [updateTexte , setUpdateTexte] = useState('')
  const [updatedPost, setUpdatedPost] = useState(data);
  const dispatch = useDispatch();
  


  // --------------------------------------------
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const date =new Date(updatedPost.updatedAt) 
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDate = date.toLocaleString('fr-FR', options);//toLocaleString() est une méthode intégrée en JavaScript qui permet de formater les dates et les nombres en fonction des paramètres régionaux spécifiés
  //dateObject.toLocaleString([locales[, options]])
// dateObject : Un objet Date ou une valeur de temps numérique (timestamp) que vous souhaitez formater.
// locales (facultatif) : Une chaîne de caractères qui indique la locale ou une liste de locales pour laquelle vous souhaitez obtenir une représentation locale. Par exemple, "fr-FR" pour le français de France.
// options (facultatif) : Un objet contenant des options supplémentaires pour le formatage. Cela peut inclure des options pour personnaliser le style de la date (court, moyen, long), le format des nombres, etc.
  console.log(formattedDate);
  useEffect(()=> {
    //  const updatedPost = posts.find((post) => post.userId === user._id ); 
     setUpdatedPost(posts.find((post) => post.userId === user._id )); 
      console.log('updatedPost', updatedPost);
  },[setUpdatedPost,updatedPost,posts,user._id])
 
  

  const updateItem = async()=> {
    // if(updateTexte){
  
    console.log('user._id: ', user._id);
    console.log('updateTexte: ', updateTexte);
    console.log( ' updatedPost._id(postId)' , updatedPost._id);
    await dispatch(updatePost(updatedPost._id, user._id, updateTexte)); 
    


    setIsUpdate(true)
    // setUpdateTexte('')
  }
  return (
    <div className="Post">
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
            {/* <span>{user.lastname} </span> */}
            <span>{user.firstname}</span>
          </div>
          {/* <span>
            <i>{likes}</i> likes
          </span> */}
          {isUpdate? ( <div> <span>{updatedPost.desc}</span> <span>{formattedDate}</span></div>  )  :(
           <>
          <textarea 
          defaultValue={updatedPost.desc}
          onChange={(e)=> setUpdateTexte(e.target.value) }
          />
         <ButtonSubmitComments texte={'Valider'}  />  {/*  validation de la mise a jour */}
         <button onClick={updateItem}>rrr</button>
          </> 
          ) }
          
        </div>
     
      </div>
      <img // si image on l'affiche dans la page au centre
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} // on va chercher limage dans le back end grace au server et ensuite l'affichée en front end
        alt=""
      />
        {user._id === data.userId && ( 
          <div className="containe-updateDelecteComment">
        {/* le button update n'apparait que pour celui qui a posté  */}
       <FontAwesomeIcon icon={faPenNib} style={{cursor:"pointer"}} onClick={()=> setIsUpdate(!isUpdate)} /> 
      <FontAwesomeIcon icon={faTrashCan}  style={{ cursor:"pointer"}} /*on click sur la croix limage disparait elle est nul  */// onClick={() => setImage(null)} />
      />
      </div>
       )}
   
      <div className="postReact">
      <FontAwesomeIcon
          icon={faComment}
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={()=> setComment(!comment)}
        />
       {/*   <div
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
         {liked ? (
            <FontAwesomeIcon
              icon={solidHeart}
              style={{ fontSize: "30px", color: "#02d6dd" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={regularHeart}
              style={{ fontSize: "30px", color: "#000" }}
            />
          )} 
            <span>
            {likes}
          </span>
        </div>*/}
       
        <FontAwesomeIcon
          icon={faShare}
          style={{ fontSize: "30px", cursor: "pointer" }}
        />
      </div>
    
     
      {/* pour afficher les commantaires du post */}
      {comment && (
        <CommentsPost/>
    
      )  }

    </div>
  );
};

export default Post;
