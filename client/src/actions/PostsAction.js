
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

