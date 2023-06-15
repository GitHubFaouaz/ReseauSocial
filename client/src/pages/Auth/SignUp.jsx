import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.png";
import BouttonSignUp from "../../component/utils/BouttonSignUp/BouttonSignUp";
import { sign_Up } from "../../actions/AuthActions";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";

function SignUp() {
  const [formSubmit, setFormSubmit] = useState(false); // sur true pour etre directement sur la page d'inscription
  // const [error, setError] = useState("");
  const errorRef = useRef("");
  const dispatch = useDispatch();
  // const { error } = useSelector((state) => state.usersReducer.error);
  // const user = useSelector((state) => state.authReducer.authData);
  // console.log(error);

  //  la data du formulaire
  // const [data, setData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   pseudo: "",
  //   email: "",
  //   password: "",
  //   confirmpass: "",
  // });

  // Exactement, le name ici correspond à l'attribut name de l'élément HTML qui a déclenché l'événement, donc il peut être "name", "email" ou "message", selon l'élément sur lequel l'utilisateur a entré des informations
  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value }); // il prend l'ensemble des valeur firsname Username password
  // };

  // Form Submission
  const HandleSubmit = async (event) => {
    event.preventDefault();
    // const pseudoError = document.querySelector(".pseudoError");
    // const emailError = document.querySelector(".emailError");
    // const passwordError = document.querySelector(".passwordEerror");
    // const passwordConfirmError = document.querySelector(
    //   ".password-confirmError"
    // );
    // passwordConfirmError.innerHTML = ""; // pour reinitialiser

    const formData = event.currentTarget; // dans le event au debut  dans la console document.querySelector('form') c'ets la meme chose on recupere le formulaire

    const valuesFormData = Object.fromEntries(new FormData(formData)); //La méthode Object.fromEntries() permet de transformer une liste de paires de clés/valeurs en un objet. Le constructeur FormData() crée un nouvel objet FormData.
    // console.log(valuesFormData);

    useEffect(() => {
      dispatch(sign_Up(formData)).then((response) => {
        if (response.type === "Auth_Fail") {
          // setError(response.error);
          errorRef.current = response.error;
        } else {
          dispatch(sign_Up(valuesFormData)); //152

          setFormSubmit(true);
        }
      });
    }, [valuesFormData, formData]);
    // if (valuesFormData.password !== valuesFormData.confirmpass) {
    //   passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    // } else {
    //   dispatch(sign_Up(valuesFormData)); //152

    //   setFormSubmit(true);
    // }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const pseudoError = document.querySelector(".pseudoError");
  //   const emailError = document.querySelector(".emailError");
  //   const passwordError = document.querySelector(".passwordEerror");
  //   const passwordConfirmError = document.querySelector(
  //     ".password-confirmError"
  //   );
  //   passwordConfirmError.innerHTML = ""; // pour reinitialiser

  //   if (data.password !== data.confirmpass) {
  //     passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
  //   } else {
  //     dispatch(sign_Up(data)); //152
  //     // console.log(data);
  //     setFormSubmit(true);

  //   }
  // };

  return (
    <>
      {formSubmit ? ( // sur true
        <SignIn />
      ) : (
        <div className="auth">
          <div className="colorBg"></div>
          <div className="colorBg"></div>
          <div className="colorBg"></div>

          <div className="containerForm">
            <div className=".containerLogo">
              <img src={logo} alt="logo" />

              <h1>TAWHID</h1>
            </div>

            <div className="box">
              <form className="form" onSubmit={HandleSubmit}>
                <h2>S'inscrire</h2>
                <div className="inputBox">
                  <input
                    type="text"
                    required="required"
                    name="firstname"
                    // value={data.firstname}
                    // onChange={handleChange}
                  />
                  <span>Nom</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="text"
                    required="required"
                    name="lastname"
                    // value={data.lastname}
                    // onChange={handleChange}
                  />
                  <span>Prenom</span>
                  <i></i>
                </div>
                {/* <div className="inputBox">
                  <input
                    type="text"
                    required="required"
                    name="pseudo"
                    // value={data.pseudo}
                    // onChange={handleChange}
                  />
                  <span>Pseudo</span>
                  <i></i>
                </div> */}
                <div className="inputBox">
                  <input
                    type="text"
                    required="required"
                    name="email"
                    // value={data.email}
                    // onChange={handleChange}
                  />
                  <span>Email</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    required="required"
                    name="password"
                    // value={data.password}
                    // onChange={handleChange}
                  />
                  <span>Mot de passe</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    required="required"
                    name="confirmpass"
                    // value={data.confirmpass}
                    // onChange={handleChange}
                  />
                  <span>Confirmez le mot de passe</span>
                  <i></i>
                </div>

                {/* <div className="square"> */}
                <button className="square" type="submit" value={"submit"}>
                  <BouttonSignUp />
                </button>
                {/* <input type="submit" value={"c"} /> */}
                {/* </div> */}
                <div className="square animationSquare">
                  <Link to="/login">Vous n'avez pas de compte ?</Link>
                </div>
                <div className="square animationSquare"></div>

                <div className="square animationSquare ">
                  {/* {error !== "" && { error }} */}
                  {errorRef.current !== "" && <div>{errorRef.current}</div>}
                </div>
                <div className="square animationSquare"></div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
