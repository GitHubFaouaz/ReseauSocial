import React from "react";
import PostShare from "../PostShare/PostShare";
import Posts from "../Posts/Posts";
function ProfileCenter() {
  return (
    <div className="ProfileCenter">
      {/* postSide ou center  */}
      <PostShare /> {/* pour poster quelque chose images video .... */}
      <Posts /> {/*les elements deja postés en dessous */}
    </div>
  );
}

export default ProfileCenter;
