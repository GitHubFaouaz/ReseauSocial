import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from "../InfoCard/InfoCard";
import ProfileCard from "../ProfileCard/ProfileCard";

function ProfileLeft({ location }) {
  return (
    <div className="profileLeft">
      {location === "profilLeft" ? <ProfileCard /> : <InfoCard />}
      <FollowersCard />
    </div>
  );
}

export default ProfileLeft;
