
import * as PostsApi from "../api/PostsRequests";

// obtenir des publications(posts) sur la chronologie
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    // const { data } = await PostsApi.getTimelinePosts(id);
    const dataPost = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: dataPost.data });
  } catch (error) {
    // console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const updateLikeDislike = (id,userId) => async (dispatch) => {
dispatch({type:'LIKE_START'});
try{
  const datalike = await PostsApi.likePost(id,userId);
  console.log(datalike);
  dispatch({type:'LIKE_SUCCESS' , data: datalike.likes   })     
}catch(error){
   dispatch({type:'LIKE_FAIL' , error : error  })
}

}

// modifaiction d'un post
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
    console.log('deletePostRedux' + JSON.stringify( deletePost.data,null,2));
    // dispatch({type:'DELETEPOST_SUCCESS' , data: deletePost.data }) // deletePost: { userId, desc } 
    dispatch({type:'DELETEPOST_SUCCESS' , data: deletePost.data }) // deletePost: { userId, desc } 
    
  }catch (error) {
    // console.log(' id ' , id  + ' userId ',userId )
     console.error('error',error.response.data);
    dispatch({type:'DELETEPOST_FAIL' , error : error  })
  }

}
