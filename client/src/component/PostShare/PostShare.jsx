import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const descRef = useRef(); //Le useRefcrochet vous permet de conserver des valeurs entre les rendus.
  //Il peut être utilisé pour stocker une valeur modifiable qui ne provoque pas de nouveau rendu lors de la mise à jour.
  //useRef()ne renvoie qu'un seul élément. Il renvoie un objet appelé current https://www.w3schools.com/react/react_useref.asp
  const imageRef = useRef();

  // handle Image Change
  const onImageChange = (event) => {
    // event.target.files permet d'accéder aux fichiers sélectionnés à l'aide de l'élément <input type="file"> la propriété event.target.files contient un objet FileList qui représente la liste des fichiers sélectionnés.
    // sil ya des fichiers et 1er fichier  :
    if (event.target.files && event.target.files[0]) {
      // vérifie si des fichiers ont été sélectionnés et si le premier fichier a été défini. Cela permet de s'assurer qu'un fichier d'image a été sélectionné.
      let img = event.target.files[0]; //  valeur du premier fichier avec [0]
      setImage(img); // on met a jour le state
    }
  };
  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data les informations de l'element posté ainsi que le id
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
      // image: string comme dans le postModel en back end est mit a jours avec  newPost.image
    };

    // if there is an image with post   pour vérifier si un fichier d'image a été sélectionné ou chargé.
    if (image) {
      // FormData est un objet JavaScript utilisé pour créer des paires clé-valeur et les envoyer sous forme de données multipart dans les requêtes HTTP. L'objet FormData facilite l'ajout de données au format clé-valeur, où chaque clé est associée à une valeur. Les paires clé-valeur sont ensuite envoyées avec la requête HTTP.
      const data = new FormData(); //L'interface FormData permet de construire facilement un ensemble de paires clé/valeur représentant les champs du formulaire et leurs valeurs et Le constructeur FormData() crée un nouvel objet FormData.
      const fileName = Date.now() + image.name; // Vous générez un nom de fichier unique en utilisant Date.now() combiné avec le nom d'origine du fichier (image.name)
      data.append("name", fileName); // clée name : date et nom de limage  Une fois que vous avez créé l'instance de FormData, vous pouvez utiliser sa méthode append() pour ajouter des paires clé-valeur au formulaire. La méthode append() prend deux arguments : la clé et la valeur
      data.append("file", image); // clée file : valeur image  ici on a simplement l'image
      newPost.image = fileName; //Vous mettez à jour la propriété image de l'objet newPost avec le nom de fichier généré (fileName)
      console.log(newPost);
      try {
        dispatch(uploadImage(data)); // on envoi limage a redux pour la mise a jour
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost)); // on poste
    resetShare();
  };
  //---- Reset Post Share la fonction pour remettre a zero l'input post et limage
  const resetShare = () => {
    setImage(null);
    descRef.current.value = "";
  };
  return (
    <div className="PostShare">
      <div className="imageAndInput">
        <img
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="Profile"
        />
        <input
          type="text"
          placeholder="Que ce passe-t-il?"
          required
          ref={descRef}
        />
      </div>
      <div className="containeOption">
        <div className="postOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            {/* En appelant la méthode JavaScript  .click()  sur cet élément, un événement de clic est déclenché, ce qui peut ouvrir une boîte de dialogue de sélection de fichiers pour l'utilisateur. */}
            {/* imageRef.current est utilisé pour accéder à la référence actuelle de l'élément DOM*/}
            <UilScenery />
            Photo
          </div>
          <div className="option">
            <UilPlayCircle />
            Video
          </div>
          <div className="option">
            <UilLocationPoint />
            Location
          </div>
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {/* <span>Partager</span> */}
            {loading ? <span>uploading...</span> : <span>Partager</span>}
          </button>
          {/* // A REVOIRE a comprendre la liaison avec button photo  */}
          <div style={{ display: "none" }} className="fileChange">
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {/* si on a une image elle s'affiche avant detre publier */}
        {image && (
          <div className="previewImage">
            <UilTimes
              style={{
                position: "absolute",
                right: "0",
              }} /*on click sur la croix limage disparait elle est nul  */
              onClick={() => setImage(null)}
            />

            <img src={URL.createObjectURL(image)} alt="preview" />
            {/* createObjectURLest exécuté de manière synchrone (immédiatement) 
            La méthode statique URL.createObjectURL() crée une chaîne contenant une URL représentant l’objet passé en paramètre. La durée de vie de l’URL est liée au document de la fenêtre depuis laquelle elle a été créée. La nouvelle URL d’objet représente l’objet File ou Blob spécifié.*/}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
