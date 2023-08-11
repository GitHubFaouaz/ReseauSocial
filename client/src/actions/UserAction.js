import * as UserApi from "../api/UserRequests";
// import React from "react";

export const getUsers = (users) => async (dispatch) => {
  // const dispatch = useDispatch();
  dispatch({ type: "USERS_START" });
  try {
    const { data } = await UserApi.getAllUser(users);
    dispatch({ type: "USERS_SUCESS", data: data });
    // console.log('USERS_Data' ,  data);
  } catch (error) {
    console.log(error);
    dispatch({ type: "USERS_FAIL" });
  }
};
// pour le  ProfilModal mise des information de l'user
export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    // console.log("Action recevoir: ", data);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER", data: id });
  UserApi.followUser(id, data); // Ce sont les paramètres de la fonction. La fonction followUser prend deux paramètres : id, qui représente l'ID de l'utilisateur à suivre, et data, qui est probablement un objet contenant des données supplémentaires à envoyer à l'API.
};

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: id });
  UserApi.unfollowUser(id, data);
};
