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

export const getUser = (userId) => API.get(`/api/user/${userId}`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = (users) => API.get("api/user", users);
export const followUser = (id, data) => API.put(`/api/user/${id}/follow`, data); //on envoi la data et  id, qui représente l'ID de l'utilisateur à suivre, et data, qui est probablement un objet contenant des données supplémentaires à envoyer à l'API.
export const unfollowUser = (id, data) => API.put(`/api/user/${id}/unfollow`, data);
