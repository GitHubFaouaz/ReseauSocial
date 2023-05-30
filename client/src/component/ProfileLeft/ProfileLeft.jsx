import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
// import LogoSearch from "../LogoSearch/LogoSearch";
import ProfileCard from "../ProfileCard/ProfileCard";

function ProfileLeft() {
  return (
    <div className="profileLeft">
      <ProfileCard location="homePage" />
      <FollowersCard />
    </div>
  );
}

export default ProfileLeft;
