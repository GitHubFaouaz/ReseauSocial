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
  console.log(error);

  const dispatch = useDispatch();

  //  la data du formulaire
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value }); // il prend l'ensemble des valeur firsname Username password .... en meme temps au lieu de faire 1 par 1 Username"Username
  };
  // console.log(data);
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);
  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(data));
  };

  return (
    // <div>
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

          <h1>TAWHID</h1>
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
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="inputBox">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={data.password}
                  onChange={handleChange}
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
    // </div>
  );
}

export default SignIn;
