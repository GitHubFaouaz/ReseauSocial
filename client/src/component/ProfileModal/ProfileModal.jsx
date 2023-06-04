import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core"; // sur le site matine
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/UploadAction";
import { updateUser } from "../../actions/UserAction";

// modale du profil
const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data; // other =autre (mots de passe)
  const [formData, setFormData] = useState(other); // on met les information du modal dans le state
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  console.log(other);
  const { user } = useSelector((state) => state.authReducer.authData);

  // Fonction qui prend toutes les informations des inputs pour les traités
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // e= information reçu du modal
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // event = information reçu
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission boutton submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData; // on reprend les infos entrer dans le modal
    // 1 photo profil
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name; // on attribut un date au nom pour le rendre unique
      data.append("name", fileName);
      data.append("file", profileImage);
      UserData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data)); // on met a jour avec la date dans le store
      } catch (err) {
        console.log(err);
      }
    }
    //2 photo background
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData)); //
    setModalOpened(false); //modalOuvert
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInput"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="worksAt"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.livesin}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesin"
            className="infoInput"
          />
          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInput"
          />
        </div>

        {/* <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Relationship status"
            name="relationship"
          />
        </div> */}

        <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button
          className="button infoButton"
          type="submit"
          onChange={handleSubmit}
        >
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
