import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // thunk permet de faire des requettes asynch ;distribuer des actions
import { indexReducers } from "../reducers";
// import { sign_Up } from "../action/AuthActions";
import { getAllUser } from "../actions/UserAction";

const store = createStore(
  indexReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

// store.dispatch(sign_Up(),getAllUser());
store.dispatch(getAllUser());
// store.getState();

export default store;
