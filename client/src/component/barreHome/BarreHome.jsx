import React from "react";
import { useUserContext } from "../utils/AppContext/AppContext";

const BarreHome = () => {
  const { user } = useUserContext();
  return (
    <div className="containeBarre">
      <p className="welcom">bienvenue {user.lastname}</p>
    </div>
  );
};

export default BarreHome;
