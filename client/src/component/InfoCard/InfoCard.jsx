import React, { useEffect, useState } from "react";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";
import BouttonLogOut from "../utils/BouttonLogOut/BouttonLogOut.jsx";

// info card la partie profil  ( profil info  status lives in works at )
const InfoCard = () => {
  const dispatch = useDispatch(); // https://react-redux.js.org/api/hooks
  const params = useParams(); // Le useParamscrochet renvoie un objet de paires clé/valeur des paramètres dynamiques de l'URL actuelle qui ont été mis en correspondance par le <Route path>. Les routes enfants héritent de tous les paramètres de leurs routes parentes.https://reactrouter.com/en/main/hooks/use-params#useparams
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id; // id de url
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  // boutton de deconnection
  const handleLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user); // on a le user dans le state
        // console.log("si user trouvé" + profileUser);
      } else {
        // soit on va le chercher
        // console.log("fetching");
        const profileUser = await UserApi.getUser(profileUserId); //aller chercher le user dont le id correspond a l'url
        setProfileUser(profileUser);
        // console.log(profileUser);
      }
    };

    fetchProfileUser();
  }, [user, profileUser, profileUserId]); // on observe les changements

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Informations profil</h4>
        {user._id === profileUserId ? (
          <div>
            {/* https://www.npmjs.com/package/@iconscout/react-unicons   Plus de 1000 icônes vectorielles au pixel près en tant que composants React. Ces icônes sont conçues par Iconscout */}
            <UilPen // le stylet qui permet d'afficher le modal pour modifier le profil avec photo ....
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
              color="#02d6dd"
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span>
          <b>Nom </b>
        </span>
        <span>{profileUser.lastname}</span>
      </div>
      <div className="info">
        <span>
          <b>Prenom </b>
        </span>
        <span>{profileUser.firstname}</span>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
        {/*  maintenant qu'on a trouver le profiluser on exploite ses données */}
      </div>
      <div className="info">
        <span>
          <b>Vit à </b>
          {/*L'élément HTML <b> permet d'attirer l'attention du lecteur sur un contenu qui n'a pas, pour autant, d'importance significative. Anciennement utilisé pour mettre le texte en gras */}
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Travaille à </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        <BouttonLogOut />
      </button>
    </div>
  );
};

export default InfoCard;
