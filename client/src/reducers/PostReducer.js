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
      
        // return { ...state, posts: state.posts.map((post) =>
        //   post._id === action.data.userId ? { ...post, likes: action.data.desc } : post // on retourne toujours les valeurs de base si on ne rentre pas dans la condition
        // ),}
        return { ...state,updatedPost: action.data, loading: false, error: false };

        case "UPDATEPOST_FAIL":
          return { ...state, loading: false, error: true };

      default:
      return state;
  }
};

export default postReducer;
