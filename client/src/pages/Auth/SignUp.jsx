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
  const [formSubmit, setFormSubmit] = useState(true); // sur true pour etre directement sur la page d'inscription
  const [error, setError] = useState("");
  const lowerCaseRef = useRef(null);
  const upperCaseRef = useRef(null);
  const digitRef = useRef(null);
  const specialCharRef = useRef(null);
  const minLengthRef = useRef(null);
  const dispatch = useDispatch();
  const errorReduce = useSelector((state) => state.authReducer.error);

  
 /*  const HandleSubmit = async (event) => {
    event.preventDefault();

    const formData = event.currentTarget;

    const valuesFormData = Object.fromEntries(new FormData(formData));
    
    if (valuesFormData.password === valuesFormData.confirmPassword) {
      dispatch(sign_Up(valuesFormData));
       if(errorReduce){
        setError(errorReduce) 
         console.log(errorReduce);
        //  setFormSubmit(true);
       } else{
        dispatch(sign_Up(valuesFormData));
      setFormSubmit(false);
       }

    } else {
      setError("La confirmation du mot de passe est incorrect");
    }
  }; */
  const HandleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = event.currentTarget;
  
    const valuesFormData = Object.fromEntries(new FormData(formData));
  
    if (valuesFormData.password === valuesFormData.confirmPassword) {
      const passwordValidation = checkPassword(
        valuesFormData.password,
        lowerCaseRef,
        upperCaseRef,
        digitRef,
        specialCharRef,
        minLengthRef
      );
  
      if (passwordValidation && passwordValidation.isValid) {
        dispatch(sign_Up(valuesFormData));
        if (errorReduce) {
          setError(errorReduce);
          console.log(errorReduce);
        } else {
          setFormSubmit(false);
        }
      } else {
        const errorMessage = passwordValidation ? passwordValidation.errorMessage : "Validation du mot de passe échouée";
        setError(errorMessage);
      }
    } else {
      setError("La confirmation du mot de passe est incorrect");

    }
  };
  const resetError = () => {
    setError(null);
  };

  return (
    <>
      {formSubmit ?  (
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
                  <input type="text" required="required" name="email" onChange={()=> setError('') } />
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
      ):(
      <SignIn />
    ) }
    </>
  );
}

export default SignUp;
