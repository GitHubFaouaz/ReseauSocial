import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Nav = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  // const list = document.querySelectorAll(".navigation li");
  // function activelink() {
  //   list.forEach((item) => item.classList.remove("active")); // <li className="active"> on supprime pour un li pour ajouter sur un autre li
  //   this.classList.add("active");
  // }
  // // La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
  // list.forEach((item) => item.addEventListener("mouseover", activelink)); // on appelle la function activelink au click avec item comme parametre
  // // La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.

  return (
    <>
      <ul className="navigation">
        <li className={({ isActive }) => (isActive ? "active" : "icon")}>
          <div className="containeIconNav">
            <span className="icon">
              <NavLink
                to="../home" // className={({ isActive, isPending }) =>
                //   isPending ? "pending" : isActive ? "active" : ""
                // }
              >
                <ion-icon name="home-outline"></ion-icon>
              </NavLink>
            </span>
            <span className="text">Home</span>
          </div>
        </li>

        <li className={({ isActive }) => (isActive ? "active" : "icon")}>
          <div className="containeIconNav">
            <span className="icon">
              <NavLink
                to={`/profile/${user._id}`}
                // className={({ isActive }) => (isActive ? "active_link" : "")}
              >
                <ion-icon name="person-outline"></ion-icon>
              </NavLink>
            </span>

            <span className="text">Profile</span>
          </div>
        </li>
        <li className={({ isActive }) => (isActive ? "active" : "icon")}>
          <div className="containeIconNav">
            <span className="icon">
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <ion-icon name="camera-outline"></ion-icon>
              </NavLink>
            </span>
            <span className="text">Messages</span>
          </div>
        </li>

        <li className={({ isActive }) => (isActive ? "active" : "icon")}>
          <div className="containeIconNav">
            <span className="icon">
              <NavLink
                to=""
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <ion-icon name="settings-outline"></ion-icon>
              </NavLink>
            </span>
            <span className="text">Settings</span>
          </div>
        </li>
      </ul>
    </>
  );
};
export default Nav;
