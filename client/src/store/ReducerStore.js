import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { indexReducers } from "../reducers";
import { getUsers } from "../actions/UserAction";

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

//envoi dans le store 
store.subscribe(() => saveToLocalStorage(store.getState()));//tore.getState() est utilisée pour obtenir l'état actuel du store Redux, Redux renvoie un objet qui représente l'état global du store, contenant toutes les données stockées dans les différents reducers.
store.dispatch(getUsers());// on envoi dans le store la liste des utilisateurs qui sera envoyer aussi grace a la function saveToLocalStorage dans le localStorage


export default store;

// La méthode subscribe() est une fonctionnalité fournie par la bibliothèque Redux (et également utilisée dans Redux Toolkit) qui permet de suivre les changements dans le store et d'exécuter des fonctions spécifiques lorsque ces changements se produisent.