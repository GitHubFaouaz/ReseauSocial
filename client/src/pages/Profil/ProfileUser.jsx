import React from "react";
import BarreHome from "../../component/barreHome/BarreHome";
import ProfileCard from "../../component/ProfileCard/ProfileCard";
import ProfileLeft from "../../component/ProfileLeft/ProfileLeft";
import PostCenter from "../../component/PostCenter/PostCenter";
import ProfileRight from "../../component/ProfileRight/ProfileRight";
const Profile = () => {
  return (
    <>
      <BarreHome />
      <div className="profileUser">
        <ProfileLeft />
        <div className="Profile-center">
          <ProfileCard location="profilPage" />
          <PostCenter />
          {/* si location="homePage" est actif on attribut location="profilPage" */}
          {/* on utilise location pour afficher certains elements ou pas quand on est sur la page profil */}
          {/* <PostSide /> */}
        </div>
        <ProfileRight />
      </div>
    </>
  );
};

export default Profile;
