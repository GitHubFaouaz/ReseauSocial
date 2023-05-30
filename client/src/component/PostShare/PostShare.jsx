import { useSelector } from "react-redux";

import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";

import { UilTimes } from "@iconscout/react-unicons";
import { useState } from "react";

const PostShare = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [image, setImage] = useState(null);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

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
        <input type="text" placeholder="Que ce passe-t-il?" required />
      </div>
      <div className="containeOption">
        <div className="postOptions">
          <div className="option">
            <UilScenery />
            Photo
          </div>

          <div className="option">
            {" "}
            <UilPlayCircle />
            Video
          </div>
          <div className="option">
            <UilLocationPoint />
            Location
          </div>

          <button
            className="button ps-button"
            // onClick={handleUpload}
            // disabled={loading}
          >
            <span>Partager</span>
            {/* {loading ? "uploading" : "Share"} */}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />{" "}
            {/* createObjectURLest exécuté de manière synchrone (immédiatement) 
            La méthode statique URL.createObjectURL() crée une chaîne contenant une URL représentant l’objet passé en paramètre. La durée de vie de l’URL est liée au document de la fenêtre depuis laquelle elle a été créée. La nouvelle URL d’objet représente l’objet File ou Blob spécifié.*/}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
