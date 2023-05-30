import React from "react";
import BarreHome from "../../component/barreHome/BarreHome";
// import ProfileCardCenter from "../../component/ProfilCardCenter/ProfilCradCenter";
import ProfileCard from "../../component/ProfileCard/ProfileCard";
import ProfileLeft from "../../component/ProfileLeft/ProfileLeft";
import ProfileRight from "../../component/ProfileRight/ProfileRight";
const Profile = () => {
  return (
    <>
      <BarreHome />
      <div className="profileUser">
        <ProfileLeft />
        <div className="Profile-center">
          {/* <ProfileCardCenter /> */}
          <ProfileCard location="profilPage" />{" "}
          {/* on utilise location pour afficher certains elements ou pas quand on est sur la page profil */}
        </div>
        <ProfileRight />
      </div>
    </>
  );
};

export default Profile;
