import * as AuthApi from "../api/AuthRequests";

export const sign_Up = (formData) => async (dispatch) => {
  dispatch({ type: "Auth_Start" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "Auth_Succes", data: data });
  } catch (error) {
    
    console.log(error.response.data.message);
    dispatch({ type: "Auth_Fail", error: error.response.data.message });
  }
};

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "Auth_Start" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "Auth_Succes", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "Auth_Fail", error: error.response.data });
    // dispatch({ type: "Auth_Fail", error: error.response.message });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
