import { NavLink } from "react-router-dom";
import { useDispatch} from "react-redux";
import { logout } from "../../actions/AuthActions";
import { useUserContext } from "../utils/AppContext/AppContext";
const Nav = () => {
  const {user} = useUserContext()
  const dispatch = useDispatch();
  // boutton de deconnection
  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <ul className="navigation">
        <li>
          <NavLink
            to="../home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span className="text">Accueil</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/profile/${user._id}`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="icon">
              <ion-icon name="person-outline"></ion-icon>
            </span>

            <span className="text">Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to=""
            // className={({ isActive }) => (isActive ? "active" : "")}
            className={({ isActive }) => (isActive ? "" : "")}
          >
            <span className="icon">
              <ion-icon name="camera-outline"></ion-icon>
            </span>
            <span className="text">Messages</span>
          </NavLink>
        </li>

        {/*   <li>
          <span className="icon">
      
            <NavLink to="">
              <ion-icon name="settings-outline"></ion-icon>
            </NavLink>
          </span>
          <span className="text">Settings</span>
        </li> */}
        <li onClick={handleLogOut}>
          <NavLink to={""} className={({ isActive }) => (isActive ? "" : "")}>
            <span className="icon">
              <ion-icon name="log-out-outline"></ion-icon>
            </span>

            <span className="text">Deconnexion</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
};
export default Nav;
