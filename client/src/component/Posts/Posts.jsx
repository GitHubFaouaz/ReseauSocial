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
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id)); //obtenir des publications sur la chronologie
  }, [ dispatch,user._id]);
  //si pas de posts
  if (!posts) return "No Posts";
  //si posts
  if (params.id) posts = posts.filter((post) => post.userId === params.id); // userId de celui qui a posté  = id de url
  return (
    <div className="Posts">
      {loading
        ? "Chargement..." // pendant le chargement
        : posts.map((post, id) => {
            return <Post data={post} key={id} />; // on affiche tous les post avec le id
          })}
    </div>
  );
};

export default Posts;
