import React from 'react';

const FormattedData = ({ post }) => {
  const date = new Date(post)
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  // const formattedDate = date.toLocaleString('fr-FR', options);//toLocaleString() est une méthode intégrée en JavaScript qui permet de formater les dates et les nombres en fonction des paramètres régionaux spécifiés
  const formattedDate = date.toLocaleDateString('fr-FR', options);//toLocaleString() est une méthode intégrée en JavaScript qui permet de formater les dates et les nombres en fonction des paramètres régionaux spécifiés
  //dateObject.toLocaleString([locales[, options]])
  // dateObject : Un objet Date ou une valeur de temps numérique (timestamp) que vous souhaitez formater.
  // locales (facultatif) : Une chaîne de caractères qui indique la locale ou une liste de locales pour laquelle vous souhaitez obtenir une représentation locale. Par exemple, "fr-FR" pour le français de France.
  // options (facultatif) : Un objet contenant des options supplémentaires pour le formatage. Cela peut inclure des options pour personnaliser le style de la date (court, moyen, long), le format des nombres, etc.
  // console.log(formattedDate);
  return (
    <>
      <span>{formattedDate}</span>
    </>
  );
};

export default FormattedData;