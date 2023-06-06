import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";

const User = ({ person }) => {
  // person en pros
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  // console.log(user);
  // on verifier si celui qui veut suivre  na pas dans le tableau de ces followers le user._id  deja de celui qu'il veut suivre et dans ce cas il sera unfollow
  const [following, setFollowing] = useState(
    person.followers.includes(user._id) // s'il ya un suiveur (following) on regarde si son id est includ dans le tableau des followers
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user)) // si c'est le cas il est deja dans le tableau il sera enlever (ne plus suivre)
      : dispatch(followUser(person._id, user));
    // on fait l'inverse  en mettant a jour le following a cause du changement
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <img
        src={
          person.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="profile"
        className="followerImage"
      />
      <div className="name">
        <span>
          {person.firstname} {person.lastname}
        </span>

        <span>{person.email}</span>
      </div>

      <button
        className={
          following ? " fc-button UnfollowButton " : "buttonFollow fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Ne plus suivre" : "Suivre"}
      </button>
    </div>
  );
};

export default User;
