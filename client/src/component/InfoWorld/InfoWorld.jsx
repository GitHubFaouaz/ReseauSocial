import React from 'react';

const InfoWorld = () => {
  const axios = require('axios');
  
  // Appel à l'API Eventbrite pour récupérer les événements
  // axios.get('https://www.eventbriteapi.com/v3/events', {
  axios.get('https://www.eventbriteapi.com/v3/events/faouaz', {
    headers: {
      // 'Authorization': 'Bearer VOTRE_JETON_D'ACCÈS' 
      // Remplacez VOTRE_JETON_D'ACCÈS par votre jeton d'accès Eventbrite
    },
    params: {
      'organizer.id': 'VOTRE_ID_ORGANISATEUR' // Remplacez VOTRE_ID_ORGANISATEUR par l'ID de l'organisateur dont vous souhaitez récupérer les événements
    }
  })
    .then(response => {
      // Traitement des données de réponse
      const events = response.data.events;
      console.log(events);
    })
    .catch(error => {
      // Gestion des erreurs
      console.error(error);
    });

  return (
    <div>
          
    </div>
  );
};

export default InfoWorld;