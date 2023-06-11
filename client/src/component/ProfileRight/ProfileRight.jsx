import React from "react";
import Nav from "../Nav/Nav";
import TrendCard from "../TrendCard/TrendCard";

function ProfileRight() {
  return (
    <div className="profileRight">
      <Nav />
      <TrendCard /> {/*// api  */}
    </div>
  );
}

export default ProfileRight;
