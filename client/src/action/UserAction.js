import * as UserApi from "../api/UserRequests";
// import React from "react";

export const getAllUser = (users) => async (dispatch) => {
  // const dispatch = useDispatch();
  dispatch({ type: "user_start" });
  try {
    const { data } = await UserApi.getAllUser(users);
    dispatch({ type: "user_Succes", data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "user_Fail" });
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
