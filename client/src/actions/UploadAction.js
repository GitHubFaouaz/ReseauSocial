import * as UploadApi from "../api/UploadRequest"; //import tous  les  UploadApi de ""

// on telecharge limage envoyée du front end  au back dans public/ images avec multer
export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("Téléchargement d'image "); //Téléchargement d'image Action start
    await UploadApi.uploadImage(data); // mise jours de limage
  } catch (error) {
    console.log(error);
  }
};

// pour limage que je post
export const uploadPost = (data) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data }); // on envoi au reducer
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
