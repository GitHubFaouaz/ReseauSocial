// import ToogleBg from "../../component/ToogleBg/ToogleBg";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../actions/AuthActions";
import { useEffect } from "react";

function SignIn() {
  const error = useSelector((state) => state.authReducer.error);
  const [errorMessages, setErrorMessage] = useState("");
  // console.log(error);

  const dispatch = useDispatch();

  // pour que le state soit a jour sans attendre le prochain render pour afficher lerreur
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const formData = e.currentTarget;

    const valuesFormData = Object.fromEntries(new FormData(formData));
    // console.log(valuesFormData);
    dispatch(logIn(valuesFormData));
    if (error) {
      setErrorMessage(error);
    } else {
      dispatch(logIn(valuesFormData));
    }
  };

  return (
    <div id="bodySignIn">
      <div className="divColor">
        <div className="color ball"></div>
        <div className="color ball"></div>
        <div className="color ball"></div>
        <div className="color ball"></div>
        <div className="color ball"></div>
        <div className="color ball"></div>
      </div>
      <div className="containerSignIn">
        <div className=".containerLogo">
          <img src={logo} alt="logo" />

          <h1>BindYourSelf</h1>
        </div>
        <div className="signIn">
          <div className="content">
            <h2>S'identifier</h2>
            <form action="" onSubmit={HandleSubmit}>
              <div className="inputBox">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={() => setErrorMessage("")}
                />
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={() => setErrorMessage("")}
                />
              </div>
              <div className="inputBox">
                <button type="submit">Connexion</button>
              </div>
            </form>
          </div>
        </div>
        <div className="btns">
          {errorMessages ? (
            <p className="errorMessages">{errorMessages}</p>
          ) : (
            <p>
              {" "}
              Mot de passe <br />
              oublié?
            </p>
          )}
        </div>

        <div href="#" className="btns signup">
          <Link to="/Auth">Créer nouveau compte</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
