import { combineReducers } from "redux";

import authReducer from "./AuthReducers";
// import usersReducer from "./usersReducer";
import postReducer from "./PostReducer";
// import chatReducer from "./ChatUserReducer";

export const indexReducers = combineReducers({
  authReducer,
  // usersReducer,
  postReducer,
  // chatReducer,
});
