import React from "react";
import InfoWorld from "../InfoWorld/InfoWorld";
import Nav from "../Nav/Nav";
// import TrendCard from "../TrendCard/TrendCard";

function ProfileRight() {
  return (
    <div className="profileRight">
      <Nav />
      {/* <TrendCard /> api  */}
      <InfoWorld/>
    </div>
  );
}

export default ProfileRight;
