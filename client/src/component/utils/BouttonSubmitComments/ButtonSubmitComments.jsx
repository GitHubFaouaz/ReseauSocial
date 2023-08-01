import React from 'react';

const ButtonSubmitComments = ({texte ,onClick }) => {
  return (
  <>
   <button  type="submit" className='btnSubmitComments' onClick={onClick} >{texte}</button>
  </>
       

  );
};

export default ButtonSubmitComments;