import React, { useEffect, useState } from "react";

import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../UserFollowUnfollow/UserFollowUnfollow";
import { useUserContext } from "../utils/AppContext/AppContext";
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchPersons = async () => {
      // recuperation de tous les user
      const { data } = await getAllUser();
      setPersons(data);
      // console.log(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>Les gens que vous connaissez peut-être</h3>

      {/* {persons.map((person, id) => {
        // on affiche chaque user du tableau dont le id est different du user actuel
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        } else {
          return "";
        }
      })} */}
      {persons
        .filter((person) => person._id !== user._id) // on fitre pour afficher chaque personne qui ne correspond au user actuel
        .map((person, id) => (
          <User person={person} key={id} />
        ))}
      {/* Si la valeur de location est définie (différente de null, undefined ou vide), alors le <span> ne sera pas affiché. */}
      {!location ? (
        <span onClick={() => setModalOpened(true)} className="buttonModal">
          Afficher plus
        </span>
      ) : (
        ""
      )}

      <FollowersModal
        // className="FollowersModal"
        // on utilise les props pour gerer l'ouverture et la fermeture du modal au clic de Montre plus
        modalOpened={modalOpened}
        setModalOpened={setModalOpened} //onClose={() => setModalOpened(false)
      />
    </div>
  );
};

export default FollowersCard;
