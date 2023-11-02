
import * as PostsApi from "../api/PostsRequests";

// obtenir des publications(posts) sur la chronologie
export const getTimelinePosts = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    // const { data } = await PostsApi.getTimelinePosts(id);
    const dataPost = await PostsApi.getTimelinePosts();
    console.log('dataPostGet' ,  dataPost);
    dispatch({ type: "RETREIVING_SUCCESS", data: dataPost.data });
  } catch (error) {
    // console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};
/* export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    // const { data } = await PostsApi.getTimelinePosts(id);
    const dataPost = await PostsApi.getTimelinePosts(id);
    console.log('dataPostGet' ,  dataPost);
    dispatch({ type: "RETREIVING_SUCCESS", data: dataPost.data });
  } catch (error) {
    // console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
}; */
export const getPost = (postId) =>  async (dispatch) => {
  dispatch({type:'GETPOST_START'})
    try {
      const getPost = await PostsApi.getPost(postId);  
      dispatch({ type: 'GETPOST_SUCCESS', data: getPost.data });
    } catch (error) {
      dispatch({ type: 'GETPOST_FAILURE', data: error });
    }
  };


export const LikePost = (id,userId) => async (dispatch) => { // postId et userId
dispatch({type:'LIKE_START'});
try{
  const datalike = await PostsApi.ApiLikePost(id,userId);
  // console.log('datalike' , datalike.data);
  dispatch({type:'LIKE_SUCCESS' , data: datalike.data   })     
}catch(error){
  console.log(error);
   dispatch({type:'LIKE_FAIL' , error : error  })
}

}
export const unLikePost = (id,userId) => async (dispatch) => { // postId et userId
dispatch({type:'UNLIKE_START'});
try{
  const datalike = await PostsApi.ApiLikePost(id,userId);
  // console.log('dataUnLike' , datalike.data);
  dispatch({type:'UNLIKE_SUCCESS' , data: datalike.data   })     
}catch(error){
  console.log(error);
   dispatch({type:'UNLIKE_FAIL' , error : error  })
}

}


export const updatePost = (id,userId,desc) => async (dispatch) => {
  dispatch({type:'UPDATEPOST_START'});
  try {
    const newPost = await PostsApi.ApiUpdatePost(id,userId,desc);
    // console.log('newPost' + JSON.stringify( newPost.data,null,2));
    dispatch({type:'UPDATEPOST_SUCCESS' , data: newPost.data }) // newPost: { userId, desc } 
    return newPost.data;
  }catch (error) {
    // console.log(error.response.message);
    dispatch({type:'UPDATEPOST_FAIL' , error : error.response.message  })
  }

}
export const deletePost = (id,userId) => async (dispatch) => {
  dispatch({type:'DELETEPOST_START'});

  try {

    const deletePost = await PostsApi.ApiDeletePost(id,userId);
    // console.log('deletePostRedux' + JSON.stringify( deletePost,null,2));
    // s'assurer qu'il y a bien un id dans la data 
    dispatch({type:'DELETEPOST_SUCCESS' , data: deletePost.data  })

    
    }catch (error) { 
   
     console.error('error',error.response);
     dispatch({type:'DELETEPOST_FAIL' , error : error  })
  }

}

export const addCommentPost = (postId,commenterId,text) => async (dispatch) => {
  dispatch({type:'COMMENTPOST_START'});
   
  try{
    const addCommentPost = await PostsApi.ApiCommentPost(postId,commenterId,text)
   dispatch({type:'COMMENTPOST_SUCCESS' , data: addCommentPost.data })
  }catch (error){
    console.error('error',error.response);
    dispatch({type:'COMMENTPOST_FAIL' , error : error  })
  }
}