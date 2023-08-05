import * as UserApi from "../api/UserRequests";
// import React from "react";

export const getAllUser = (users) => async (dispatch) => {
  // const dispatch = useDispatch();
  dispatch({ type: "user_start" });
  try {
    const { data } = await UserApi.getAllUser(users);
    dispatch({ type: "user_Succes",data: data });
    console.log('userData' ,  data);
  } catch (error) {
    console.log(error);
    dispatch({ type: "user_Fail" });
  }
};
// pour le  ProfilModal mise des information de l'user
export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    console.log("Action recevoir: ", data);
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
