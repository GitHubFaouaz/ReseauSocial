const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    // belongs to PostShare.jsx appartient à PostShare quand on poste une image ou text
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    // belongs to Posts.jsx appartient à Posts.jsx  on recupere les posts pour les affichés
    case "RETREIVING_START": //RÉCUPÉRATION DEBUT
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
      // like et dislike
    case "LIKE_START": 
      return { ...state, loading: true, error: false };
    case "LIKE_SUCCESS":
      // return { ...state, posts: state.posts.map((post) =>
      //   post._id === action.postId ? { ...post, likes: action.likes } : post
      // ),
      return { ...state, posts: state.posts.map((post) =>
        post._id === action.data.userId ? { ...post, likes: action.data.likes } : post
      ),
         loading: false, error: false };
    case "LIKE_FAIL":
      return { ...state, loading: false, error: true };
      
      case "UPDATEPOST_START": 
      return { ...state, loading: true, error: false };
       
      case "UPDATEPOST_SUCCESS":
         
        return { ...state, posts: state.posts.map((post) => 
        //nous utilisons map pour parcourir tous les posts dans le tableau posts du state et trouver celui qui correspond à l'ID du post que nous venons de mettre à jour dans la base de données
          
          post._id === action.data._id ? {...post, desc : action.data.desc }: post // on retourne toujours les valeurs de base si on ne rentre pas dans la condition
          // ...post, desc : action.data.desc on modifi desc dans du nouveau post  
          ),loading: false, error: false }
      case "UPDATEPOST_FAIL":
          return { ...state, loading: false, error: true };
       
       case "DELETEPOST_START" : 
       return { ...state, loading: true, error: false };
       case "DELETEPOST_SUCCESS":
            return {...state ,posts: state.posts.filter((post) => post._id !== action.data._id)}// comparaison des id des posts du tableau a celui que l'on veut supprimer
          //  return state.filter((post) => post._id !== action.data._id)// comparaison des id des posts du tableau a celui que l'on veut supprimer
        case "DELETEPOST_FAIL":
          return { ...state, loading: false, error: true };   
      default:
      return state;
  }
};

export default postReducer;
