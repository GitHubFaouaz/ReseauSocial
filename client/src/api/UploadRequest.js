import axios from "axios";
// image
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const uploadImage = (data) => API.post("/upload/", data); // mise a jour pour limage  + la data
export const uploadPost = (data) => API.post("/posts", data); // on post limage  avec le desc dans la page profilCenter
