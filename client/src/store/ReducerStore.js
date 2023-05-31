// import { legacy_createStore as createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk"; // thunk permet de faire des requettes asynch ;distribuer des actions
// import { indexReducers } from "../reducers";
// // import { sign_Up } from "../action/AuthActions";
// import { getAllUser } from "../actions/UserAction";

// const store = createStore(
//   indexReducers,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// // store.dispatch(sign_Up(),getAllUser());
// store.dispatch(getAllUser());
// // store.getState();

// export default store;
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { indexReducers } from "../reducers";

// on envoi dans le localStorage
function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store", serializedStore);
  } catch (e) {
    console.log(e);
  }
}
// chargement  pour voir s'il ya des info
function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
//recevoir les info
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage();

const store = createStore(
  indexReducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
