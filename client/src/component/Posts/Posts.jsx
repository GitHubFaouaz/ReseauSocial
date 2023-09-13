import React, { useEffect, useState , memo, useMemo } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useUserContext } from "../utils/AppContext/AppContext";

// Récupération de tous les posts ....
const Posts = () => {
  // const params = useParams();
  const dispatch = useDispatch();
  // const {user} =  useUserContext();
  const {users} = useSelector((state)=> state.usersReducer )

  // console.log('users' , users);
  // console.log('userPost' , user);
  // let { posts, loading } = useSelector((state) => state.postReducer);
  const { posts, loading } = useSelector((state) => state.postReducer);
 

  
  
  // lorsque le composant est monté ou lorsque la valeur de dispatch ou user._id change. En d'autres termes, chaque fois que l'ID de l'utilisateur change ou que vous avez besoin de déclencher la récupération des publications de la chronologie
/*    useEffect(() => {
     dispatch(getTimelinePosts(user._id)); //obtenir des publications sur la chronologie

  }, [ dispatch,user._id]); */
   useEffect(() => {
     dispatch(getTimelinePosts()); //obtenir des publications sur la chronologie

  }, [ dispatch]);

   if (!posts )  return "No Posts";


  //si posts  comparaison pour trouver le user qui correspond a l'url (params.id)
  // if (params.id) posts = posts.filter((posts) => posts.userId === params.id); // userId de celui qui a posté  = id de url
 
   
  

 return (
    <div className="Posts">
      {loading
        ? "Chargement..." // pendant le chargement
        : posts.map((posts ) => {
        // console.log( "keyPost" ,posts._id);
           
          // on cherche l'utilisateur correspondant à l'id de l'utilisateur qui a posté 
         const userPosted = users.find((user) => user._id === posts.userId);
          
      
         return <  Post data={posts} user = {userPosted}   key={posts._id}/>; // on affiche tous les posts avec le id
        
     
          })}
    </div>
  );
};

export default Posts;
