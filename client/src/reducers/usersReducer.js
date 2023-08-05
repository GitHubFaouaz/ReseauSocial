// const initialState = {}; //il est vide au debuts
 const usersReducer = (state = { usersData:null  }, action) => {
  switch (action.type) {
    case "user_start":
      return { ...state }; // loading est true pour le chargement si necessaire
    case "user_Succes":
       localStorage.setItem("users", JSON.stringify({ ...action.data })); // s'il ya une action auth reussite(access) alors enregistre dans le localstorage
      //La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON
      return {
        ...state, // retourn deja le state pour ne pas ecrasé les donnée de l'utilisateur , que l'on est pas que la photo on recupere ceux qu'il y a deja
        usersData: action.data, // data: data que l'on reçois dans action
      };
    case "user_Fail":
      return { ...state };

    default:
      return state;
  }
};

export default usersReducer; 
