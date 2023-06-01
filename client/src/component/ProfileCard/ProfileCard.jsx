import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

function ProfileCard({ location }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  // const posts = useSelector((state) => state.postReducer.posts);
  const { posts } = useSelector((state) => state.postReducer);
  // console.log(user);

  return (
    <>
      {/* si pageProfile */}
      {location === "profilPage" ? (
        <div className="cardProfilPage">
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
            <span>
              {user.firstname} {user.lastname}
            </span>
          </div>

          {/*      <div className="contentData">
            <div className="details">
              <h2>
                <br />
                <span>
                  {user.worksAt ? user.worksAt : "Écris à propos de toi"}
                </span>
              </h2>
              <div className="data">
                <h3>
                  {user.followers.length} <br />
                  <span>Followers</span>
                </h3>
                <h3>
                  {user.following.length} <br />
                  <span>Following</span>
                </h3>

                <h3>
                  {
                    // on affiche les nombres de post fait par le user
                    posts.filter((post) => post.userId === user._id).length
                  }
                  <br />

                  <span>Post</span>
                </h3>
              </div>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="cardHomePage">
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
                  {user.followers.length} <br />
                  <span>Followers</span>
                </h3>
                <h3>
                  {user.following.length} <br />
                  <span>Following</span>
                </h3>
              </div>

              <div className="actionBtn">
                <Link to={`/profile/${user._id}`}>
                  <p>mon profile </p>
                </Link>
                {/* //localhost:3000/profile/:id" (ainsi sur la route fiche app ) */}
                {/* le lien pour envoyer a la page profil la route  faite sur app  */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCard;
