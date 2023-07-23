import React from 'react';
import { useSelector } from 'react-redux';
import ButtonSubmitComments from '../utils/BouttonSubmitComments/ButtonSubmitComments';

const CommentsPost = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="containe-postComment" >
    <div className="commentsLength"> 
    <div className="containe-imgName">
       <img  src={
        user.profilePicture
          ? serverPublic + user.profilePicture
          : serverPublic + "defaultProfile.png"
      }  alt=""/> 
      <div> 
      <span> nom</span> 
      <p className="comment">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque, necessitatibus quidem? Illum, sunt repellendus. Quos reiciendis vitae ex, ipsam harum architecto perferendis optio ab debitis deserunt officiis adipisci eius odio!</p> </div>
     
    </div>
    <div className="containe-imgName">
       <img  src={
        user.profilePicture
          ? serverPublic + user.profilePicture
          : serverPublic + "defaultProfile.png"
      }  alt=""/> 
      <div> 
      <span>mounir</span> 
      <p className="comment">il abuse la </p> </div>
     
    </div>
  
    </div>

    <div className="containe-inputComments">   
    <input type='text' placeholder="Laissez un commentaire"/>
    <ButtonSubmitComments/>
   
    </div>
 
  </div>  
  );
};

export default CommentsPost;