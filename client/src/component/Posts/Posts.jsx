import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Récupération de tous les posts ....
const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const {users} = useSelector((state)=> state.usersReducer )
  // console.log('users' , users);
  // console.log('user' , user);
  const { posts, loading } = useSelector((state) => state.postReducer);
  // const idUsers = users.map((user) => user._id )
//  console.log('idUsers' ,idUsers);  
  useEffect(() => {
    dispatch(getTimelinePosts(user._id)); //obtenir des publications sur la chronologie

  }, [ dispatch,user._id]);
  //si pas de posts

  if (!posts)  return "No Posts";

  //si posts
 if (params.id) posts = posts.filter((post) => post.userId === params.id); // userId de celui qui a posté  = id de url
 


 return (
    <div className="Posts">
      {loading
        ? "Chargement..." // pendant le chargement
        : posts.map((post ) => {
    
          // on cherche l'utilisateur correspondant à l'id de l'utilisateur qui a posté 
         const userPosted = users.find((user) => user._id === post.userId);
          
            return <  Post data={post} user = {userPosted}  key={post._id}/>; // on affiche tous les post avec le id
            
          })}
    </div>
  );
};

export default Posts;
