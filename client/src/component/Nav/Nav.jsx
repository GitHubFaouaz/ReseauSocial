import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Nav = () => {
  const { user } = useSelector((state) => state.authReducer.authData);

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
            <span className="text">Home</span>
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
        {/*     <li>
          <span className="icon">
            <NavLink to="">
              <ion-icon name="camera-outline"></ion-icon>
            </NavLink>
          </span>
          <span className="text">Messages</span>
        </li>

        <li>
          <span className="icon">
      
            <NavLink to="">
              <ion-icon name="settings-outline"></ion-icon>
            </NavLink>
          </span>
          <span className="text">Settings</span>
        </li> */}
      </ul>
    </>
  );
};
export default Nav;
