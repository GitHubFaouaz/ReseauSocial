import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.png";
import BouttonSignUp from "../../component/utils/BouttonSignUp/BouttonSignUp";
import { sign_Up } from "../../actions/AuthActions";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import checkPassword from "../../component/utils/CheckPassword/CheckPassword";

function SignUp() {
  const [formSubmit, setFormSubmit] = useState(false); // sur true pour etre directement sur la page d'inscription
  const [error, setError] = useState("");
  const lowerCaseRef = useRef(null);
  const upperCaseRef = useRef(null);
  const digitRef = useRef(null);
  const specialCharRef = useRef(null);
  const minLengthRef = useRef(null);
  const dispatch = useDispatch();

  /*  const HandleSubmit = async (event) => {
    event.preventDefault();

    const formData = event.currentTarget; // dans le event au debut  dans la console document.querySelector('form') c'ets la meme chose on recupere le formulaire
    // const name = formData.firstname.value;
    const valuesFormData = Object.fromEntries(new FormData(formData)); //La méthode Object.fromEntries() permet de transformer une liste de paires de clés/valeurs en un objet. Le constructeur FormData() crée un nouvel objet FormData.
    console.log(valuesFormData);
    // console.log(valuesFormData.firstname);
    if (valuesFormData.password === valuesFormData.confirmPassword) {
      if (checkPassword === true) {
        dispatch(sign_Up(valuesFormData)).then((response) => {
          if (response.type === "Auth_Fail") {
            setError(response.error);
          } else {
            dispatch(sign_Up(valuesFormData));
            setFormSubmit(true);
          }
        });
      } else {
        // console.log(
        //   "Veuillez respecter les conditions d'acceptation de mot de passe a droit de l'ecran "
        // );
        setError(
          "Veuillez respecter les conditions d'acceptation de mot de passe a droit de l'ecran "
        );
      }
    } else {
      // console.log("La confirmation du mot de passe est incorrect");
      setError("La confirmation du mot de passe est incorrect");
    }
  }; */
  const HandleSubmit = async (event) => {
    event.preventDefault();

    const formData = event.currentTarget;

    const valuesFormData = Object.fromEntries(new FormData(formData));

    if (valuesFormData.password === valuesFormData.confirmPassword) {
      dispatch(sign_Up(valuesFormData)).then((response) => {
        if (response.type === "Auth_Fail") {
          setError(response.error);
          console.log(error);
        } else {
          dispatch(sign_Up(valuesFormData));
          setFormSubmit(true);
        }
      });
    } else {
      setError("La confirmation du mot de passe est incorrect");
    }
  };
  const resetError = () => {
    setError(null);
  };

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
                  <input type="text" required="required" name="firstname" />
                  <span>Nom</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input type="text" required="required" name="lastname" />
                  <span>Prenom</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input type="text" required="required" name="email" />
                  <span>Email</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    required="required"
                    name="password"
                    onChange={(e) => {
                      resetError();
                      checkPassword(
                        e.target.value,
                        lowerCaseRef,
                        upperCaseRef,
                        digitRef,
                        specialCharRef,
                        minLengthRef
                      );
                    }}
                  />
                  <span>Mot de passe</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    required="required"
                    name="confirmPassword"
                    onChange={(e) => resetError()}
                  />
                  <span>Confirmez le mot de passe</span>
                  <i></i>
                </div>

                <button className="square" type="submit" value={"submit"}>
                  <BouttonSignUp />
                </button>

                <div className="square animationSquare">
                  <Link to="/login">Vous avez déjà un compte ?</Link>
                </div>
                <div className="square animationSquare">
                  <ul>
                    <li ref={lowerCaseRef}>
                      <i>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </i>
                      <span>une minuscule</span>
                    </li>
                    <li ref={upperCaseRef}>
                      <i>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </i>
                      <span>une majuscule</span>
                    </li>
                    <li ref={digitRef}>
                      <i>
                        {" "}
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </i>
                      <span>un chiffre</span>
                    </li>
                    <li ref={specialCharRef}>
                      <i>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </i>
                      <span>un caractère spécial</span>
                    </li>
                    <li ref={minLengthRef}>
                      <i>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </i>
                      <span>8 caractères</span>
                    </li>
                  </ul>
                </div>

                <div className="square animationSquare ">
                  {error !== "" && <p>{error}</p>}
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
