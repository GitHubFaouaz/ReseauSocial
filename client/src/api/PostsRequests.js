import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`); //obtenir des publications sur la chronologie
export const likePost = (id, userId) =>API.put(`posts/${id}/like`, { userId: userId });
export const  ApiUpdatePost = (id ,userId,desc) => API.put(`posts/${id}`,{id, userId , desc}) //id  = id  C'est une forme de décomposition  userId: userId,desc: desc,  les paramètres id, userId, et desc représentent les valeurs que nous souhaitons mettre à jour dans le post
export const ApiDeletePost = (id, userId) => API.delete(`posts/${id}`, { data: {id, userId   } });
