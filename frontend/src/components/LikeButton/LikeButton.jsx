import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import decodedUser from "jwt-decode";

const LikeButton = ({ postID, post }) => {

  const { user } = useContext(AuthContext);

  console.log(`This is the user object: ${user}.`);

  const likeIncrementor = async (e) => {
    let likedPost = {
      postID: post._id,
      likes: post.likes + 1,
      text: post.text,
    };
    await axios
      .put(`http://localhost:3011/api/users/${postID}`, likedPost, {headers :{"x-auth-token": decodedUser}})
      .then((res) => {
        console.log(res.data);
      })
  };

  return (
    <button className="likeButton" onClick={(e) => likeIncrementor(e)}>Like</button>
  );
};

export default LikeButton;
