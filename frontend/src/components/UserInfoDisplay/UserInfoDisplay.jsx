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
          Name: {props.user.name}
        </h2>
        <h2>
          Email: {props.user.email}
        </h2>
        <h2>
          Is Admin: {props.user.isadmin ? "Yes" : "No"}
        </h2>
        <button>Edit</button>
        <EditPhoto />
      </div>
    </div>
  );
};

export default UserInfoDisplay;
