import React, { useState, useEffect } from "react";
import EditPhoto from "../EditPhotoDisplay/EditPhotoDisplay";
import "./UserInfoDisplay.css";

const UserInfoDisplay = (props) => {
  return (
    <div id="userInfoDiv">
      <img
        className="profile_pic"
        src={`http://localhost:3011/${props.user.image}`}
      />
      <div id="userInfo">
        <h2>
          Name: <br></br> {props.user.name}
        </h2>
        <h2>
          email: <br></br> {props.user.email}
        </h2>
        <h2>
          admin: <br></br> {props.user.isadmin ? "Yes" : "No"}
        </h2>
        <button> Edit information</button>
        <EditPhoto />
      </div>
    </div>
  );
};

export default UserInfoDisplay;
