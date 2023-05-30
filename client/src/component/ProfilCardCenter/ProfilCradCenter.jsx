import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

function ProfileCard() {
  const { user } = useSelector((state) => state.authReducer.authData);
  // console.log(user);

  return (
    <div className="cardCenter">
      <div className="lines">
        <div className="imgBx">
          <div className="imgCover">
            <img
              src={
                user.coverPicture
                  ? serverPublic + user.coverPicture
                  : serverPublic + "defaultCover.jpg"
              }
              alt="CoverImage"
            />
          </div>
          <div className="imgProfile">
            <img
              src={
                user.profilePicture
                  ? serverPublic + user.profilePicture
                  : serverPublic + "defaultProfile.png"
              }
              alt="ProfileImage"
            />
          </div>
        </div>

        <div className="contentData">
          <div className="details">
            <h2>
              {user.firstname} {user.lastname}
              <br />
              <span>
                {user.worksAt ? user.worksAt : "Écris à propos de toi"}
              </span>
            </h2>
            <div className="data">
              <h3>
                0 <br />
                <span>Post</span>
              </h3>
              <h3>
                {user.followers.length} <br />
                <span>Followers</span>
              </h3>
              <h3>
                {user.following.length} <br />
                <span>Following</span>
              </h3>
            </div>
            {/* {"profilePage" ? (
              ""
            ) : ( */}
            <div className="actionBtn">
              <Link to={`/profile/${user._id}`}>
                <p>mon profile </p>
              </Link>
              {/* le lien pour envoyer a la page profil la route  faite sur app  */}
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
