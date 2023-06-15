import React, { useEffect } from "react";
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";

function ToggleBg() {
  const [anim, setAnim] = useState(true);

  const user = useSelector((state) => state.authReducer.authData);

  /*  //------ avec pathname
  const isHomePage = window.location.pathname === "/home"; // Il est important de noter que cette condition ne correspondra qu'à l'URL exacte "/profile/id" et ne correspondra pas à des URLs qui contiennent des informations supplémentaires après "home"  
  pathname = chemin d'accès
  // const isProfilePage = window.location.pathname === "/profile";
  const isProfilePage = window.location.pathname.startsWith("/profile/"); // cette condition ne vérifie pas si l'URL est exactement "/profile" mais si elle commence par "/profile" ce qui peut inclure des informations supplémentaires après "/profile". Cela signifie que si l'URL actuelle est "/profile/id" ou "/profile/autre-id" ou "/profile/autre-chose", cette condition sera vraie. */

  // --------- avec useState
  // currentUrl avec la valeur actuelle de window.location.pathname.

  // const [currentUrl, setCurrentUrl] = useState();
  // console.log("la page home : " + currentUrl);
  // const isHomePage = currentUrl === "/home";
  //useEffect hook pour écouter les changements de l'URL et mettre à jour la variable d'état currentUrl lorsque l'URL change
  /*   useEffect(() => {
    setCurrentUrl(window.location.pathname);s
  }, [window.location.pathname]); */

  const classToogle = () => {
    setAnim(!anim);

    if (anim) document.body.style.background = "white";
    else document.body.style.background = "#000";
  };

  return (
    <div
      className={`containerBtn ${anim ? "active" : ""} ${
        user ? "home-page" : ""
      } `}
    >
      <div onClick={classToogle} className="buttonToggle">
        <FaMoon />
        <FaSun />
        <div className="ball"></div>
      </div>
    </div>
  );
}

export default ToggleBg;
