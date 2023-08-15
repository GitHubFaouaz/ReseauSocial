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
import { deletePost, updateLikeDislike, updatePost } from "../../actions/PostsAction";
import CommentsPost from "../CommentsPost/CommentsPost";
import ButtonSubmitComments from "../utils/BouttonSubmitComments/ButtonSubmitComments";

// je recupère en props les informations envoyées du composants Posts 
const Post = ({data,user,key}) => {

  const [comment,setComment] = useState(false)
  const [isUpdate , setIsUpdate] = useState(true)
  const [updateTexte , setUpdateTexte] = useState('')
  const dispatch = useDispatch();
  


  // --------------------------------------------
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const date =new Date(data.updatedAt) 
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDate = date.toLocaleString('fr-FR', options);//toLocaleString() est une méthode intégrée en JavaScript qui permet de formater les dates et les nombres en fonction des paramètres régionaux spécifiés
  //dateObject.toLocaleString([locales[, options]])
// dateObject : Un objet Date ou une valeur de temps numérique (timestamp) que vous souhaitez formater.
// locales (facultatif) : Une chaîne de caractères qui indique la locale ou une liste de locales pour laquelle vous souhaitez obtenir une représentation locale. Par exemple, "fr-FR" pour le français de France.
// options (facultatif) : Un objet contenant des options supplémentaires pour le formatage. Cela peut inclure des options pour personnaliser le style de la date (court, moyen, long), le format des nombres, etc.
  // console.log(formattedDate);


// POUR LE REERENDER DE TOUS LES POSTS A VOIR PLUS TARD 
  useEffect(()=> {
     setIsUpdate(true)
     
  },[])
   
  
 
   // mise a jour du projet 
  const updateItem = async()=> {

  
    // console.log('user._id: ', user._id);
    // console.log('updateTexte: ', updateTexte);
    // console.log( ' updatedPost._id(postId)' , data._id);
   
    try{
      if (data) {
    await dispatch(updatePost(data._id, user._id, updateTexte)); 
    // setIsUpdate(true)
      }
    }catch(error){
   console.error(error);
    }
    
    



  }
  // button suppression du post
  const buttonDelete = async ()=> {
    await    dispatch(deletePost(data._id,user._id))
    console.log('data._idDelete' , data._id ); 
    console.log('user._idDelete', user._id);
     

  }

  //  console.log( 'userProps' , user._id);// data du user 
   console.log( 'userProps' , user);// data du user 
  //  console.log('dataProps',  data._id); // data du post 
   console.log('dataProps',  data); // data du post 
  //  console.log('keyPropos', key);
  //  console.log('IdProps', data._id); // id de la data  

  return (
    <>
 <div className="Post"  key={data._id}   >
      
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
 
          
         {isUpdate  ? ( <div> <span>{data.desc}</span> <span>{formattedDate}</span></div>  )  :( 

          
           <>
          <textarea 
          defaultValue={data.desc}
          onChange={(e)=> setUpdateTexte(e.target.value) }
          />
         <ButtonSubmitComments texte={'Valider'}  onClick={updateItem} />  {/*  validation de la mise a jour */}
          </> 
          ) }
        
          
          
        </div>
     
      </div>
      <img // si image on l'affiche dans la page au centre
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} // on va chercher limage dans le back end grace au server et ensuite l'affichée en front end
        alt="imgPost"
      /> 
       {/* le button update n'apparait que pour celui qui a posté  */}
      
        { data.userId === user._id && ( 
          <div className="containe-updateDelecteComment">
      
       <FontAwesomeIcon icon={faPenNib} style={{cursor:"pointer"}} onClick={()=> setIsUpdate(!isUpdate)} /> 
      <FontAwesomeIcon icon={faTrashCan}  style={{ cursor:"pointer"}  } onClick= {buttonDelete} /*on click sur la croix limage disparait elle est nul  */// onClick={() => setImage(null)} />
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




  

  
    </>
  );
};

export default Post;
