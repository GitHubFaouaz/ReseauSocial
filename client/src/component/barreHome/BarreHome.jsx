import React from "react";
import { useSelector } from "react-redux";

const BarreHome = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div class="containeBarre">
      <p className="welcom">bienvenue {user.pseudo}</p>
    </div>
  );
};

export default BarreHome;
