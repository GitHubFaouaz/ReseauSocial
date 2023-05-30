const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "Auth_Start": //" action est généralement utilisée pour définir l'état de chargement de l'application lors de l'exécution de l'opération d'authentification
      return { ...state, loading: true, error: false }; // loading est true pour le chargement si necessaire
    case "Auth_Succes":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data })); // s'il ya une action auth reussite(access) alors enregistre dans le localstorage
      return {
        ...state,
        authData: action.data,
        loading: false,
        error: false,
      };
    case "Auth_Fail":
      return { ...state, loading: false, error: action.error };

    // on nettoyage du localstoragea la deconexion
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false };
    case "FOLLOW_USER":
      return {
        ...state, //...state : Cela copie toutes les propriétés de l'objet state existant dans le nouvel objet. Cela garantit que les autres parties de l'état de l'application ne sont pas modifiées.
        authData: {
          ...state.authData, // on reprend les informations de base
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data], // le réducteur met à jour l'état de l'application en ajoutant la valeur de action.data à la liste des utilisateurs suivis par l'utilisateur actuel.En résumé, action.data permet d'ajouter une nouvelle donnée à une liste existante lors de la mise à jour
          },
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state, //...state : Cela copie toutes les propriétés de l'objet state existant dans le nouvel objet
        authData: {
          ...state.authData, //authData: { ... } : Cela copie toutes les propriétés de state.authData dans le nouvel objet.
          user: {
            ...state.authData.user, //user: { ... } : Cela copie toutes les propriétés de state.authData.user dans le nouvel objet.
            following: [
              //Elle utilise le spread operator (...) pour copier les éléments existants de state.authData.user.following
              ...state.authData.user.following.filter(
                //puis applique la méthode filter pour filtrer les éléments qui ne correspondent pas à action.data
                (personId) => personId !== action.data // suivre ou ne plus suivre un user
              ),
            ],
          },
        },
      }; //La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback.

    default:
      return state;
  }
};

export default authReducer;
