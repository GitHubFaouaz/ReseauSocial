import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.png";
import BouttonSignUp from "../../component/utils/BouttonSignUp/BouttonSignUp";
import { sign_Up } from "../../actions/AuthActions";
import SignIn from "./SignIn";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

function SignUp() {
  const [formSubmit, setFormSubmit] = useState(false); // sur true pour etre directement sur la page d'inscription
  // const [error, setError] = useState("");
  const errorRef = useRef("");
  const lowerCaseRef = useRef(null);
  const upperCaseRef = useRef(null);
  const digitRef = useRef(null);
  const specialCharRef = useRef(null);
  const minLengthRef = useRef(null);

  const dispatch = useDispatch();
  // console.log(e);
  // Form Submission
  /*   const HandleSubmit = async (event) => {
    event.preventDefault();

    const formData = event.currentTarget; // dans le event au debut  dans la console document.querySelector('form') c'ets la meme chose on recupere le formulaire
    // const name = formData.firstname.value;
    const valuesFormData = Object.fromEntries(new FormData(formData)); //La méthode Object.fromEntries() permet de transformer une liste de paires de clés/valeurs en un objet. Le constructeur FormData() crée un nouvel objet FormData.
    console.log(valuesFormData);
    // console.log(valuesFormData.firstname);
    dispatch(sign_Up(valuesFormData)).then((response) => {
      if (response.type === "Auth_Fail") {
        // setError(response.error);
        // errorRef.current = response.error;
      } else {
        dispatch(sign_Up(valuesFormData)); //152

        setFormSubmit(true);
      }
    });
  }; */
  const HandleSubmit = async (event) => {
    event.preventDefault();

    const formData = event.currentTarget; // dans le event au debut  dans la console document.querySelector('form') c'ets la meme chose on recupere le formulaire
    // const name = formData.firstname.value;
    const valuesFormData = Object.fromEntries(new FormData(formData)); //La méthode Object.fromEntries() permet de transformer une liste de paires de clés/valeurs en un objet. Le constructeur FormData() crée un nouvel objet FormData.
    console.log(valuesFormData);
    // console.log(valuesFormData.firstname);

    dispatch(sign_Up(valuesFormData)); //152

    setFormSubmit(true);
  };

  function checkPassword(data) {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&#*.;])");
    const length = new RegExp("(?=.{8,})");

    //Lower Case Validation
    if (lower.test(data)) {
      // on  test la data dont on recupere la valeur(this.value) avec la fonction checkPassword
      // La méthode "test" de l'objet RegExp est utilisée pour vérifier si une correspondance est trouvée entre une expression régulière et une chaîne de caractères
      lowerCaseRef.current.classList.add("valid"); // si lower est minuscule alors ajout la class valid
    } else {
      lowerCaseRef.current.classList.remove("valid"); // sinon efface
    }
    //Upper Case Validation
    if (upper.test(data)) {
      // La méthode test() vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire.
      upperCaseRef.current.classList.add("valid");
    } else {
      upperCaseRef.current.classList.remove("valid");
    }
    //Number Validation
    if (number.test(data)) {
      digitRef.current.classList.add("valid");
    } else {
      digitRef.current.classList.remove("valid");
    }
    //Special Charater Validation
    if (special.test(data)) {
      specialCharRef.current.classList.add("valid");
    } else {
      specialCharRef.current.classList.remove("valid");
    }
    //Password Minimum Length Validation
    if (length.test(data)) {
      minLengthRef.current.classList.add("valid");
    } else {
      minLengthRef.current.classList.remove("valid");
    }
  }
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
                    onChange={(e) => checkPassword(e.target.value)}
                  />
                  <span>Mot de passe</span>
                  <i></i>
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    required="required"
                    name="confirmpass"
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
