import React, { useState, useEffect } from 'react';

const UserInfoDisplay = (props) => {
    return (  

     <div className="userInfoDiv">
       
       <img  className = "avatar_profile_pic" src={`http://localhost:3011/${props.user.image}`} /> 
        <h2>Name: <br></br> {props.user.name}</h2>
        <h2>email: <br></br>  {props.user.email}</h2>
        <h2>admin: <br></br>  {props.user.isadmin ? "Yes": "No"}</h2>
         <span><button> Edit photo</button></span>
         <span><button> Edit information</button></span>
        


     </div>


    );
}
 

export default UserInfoDisplay;
