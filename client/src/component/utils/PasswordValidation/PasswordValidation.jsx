import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
const PasswordValidation = () => {
  const lowerCaseRef = useRef(null);
  const upperCaseRef = useRef(null);
  const digitRef = useRef(null);
  const specialCharRef = useRef(null);
  const minLengthRef = useRef(null);
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
      {" "}
      <ul>
        <li ref={lowerCaseRef}>
          <i>
            <FontAwesomeIcon icon={faThumbsUp} />
          </i>
          <span>1 caractère minuscule</span>
        </li>
        <li ref={upperCaseRef}>
          <i>
            <FontAwesomeIcon icon={faThumbsUp} />
          </i>
          <span>1 caractère majuscule</span>
        </li>
        <li ref={digitRef}>
          <i>
            {" "}
            <FontAwesomeIcon icon={faThumbsUp} />
          </i>
          <span>1 chiffre</span>
        </li>
        <li ref={specialCharRef}>
          <i>
            <FontAwesomeIcon icon={faThumbsUp} />
          </i>
          <span>1 caractère spécial</span>
        </li>
        <li ref={minLengthRef}>
          <i>
            <FontAwesomeIcon icon={faThumbsUp} />
          </i>
          <span> 8 caractères</span>
        </li>
      </ul>
    </>
  );
};

export default PasswordValidation;
