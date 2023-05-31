import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";

const User = ({ person }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  console.log(user);

  const [following, setFollowing] = useState(
    person.followers.includes(user._id) // s'il ya un suiveur (following) on regarde si son id est includ dans le tableau des followers
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      {/* <div> */}
      <img
        src={
          // serverPublic + person.profilePicture
          //   ? serverPublic + person.profilePicture
          //   : serverPublic + "defaultProfile.png"
          serverPublic + "defaultProfile.png"
        }
        alt="profile"
        className="followerImage"
      />
      <div className="name">
        <span>{person.pseudo}</span>
        <span>{person.email}</span>
      </div>

      <button
        className={
          following ? " fc-button UnfollowButton " : "buttonFollow fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
      {/* </div> */}
    </div>
  );
};

export default User;
