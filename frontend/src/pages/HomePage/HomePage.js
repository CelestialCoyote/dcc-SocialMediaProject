import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./HomePage.css";
import UserInfoDisplay from "../../components/UserInfoDisplay/UserInfoDisplay";
import PostForm from "../../components/PostForm/PostForm";
import PostList from "../../components/PostList/PostList";

const HomePage = () => {
  //  state variables for comments
  const [posts, setPosts] = useState(null);
  const [friendsPosts, setFriendsPosts] = useState(null);
  const { user } = useContext(AuthContext);
  const decodedUser = localStorage.getItem("token");

  // Get user's posts.
  const handleGetPosts = async () => {
    let response = await axios.get(
      `http://localhost:3011/api/posts/${user._id}/allPosts`,
      { headers: { "x-auth-token": decodedUser } }
    );
    setPosts(response.data);
  };

  // Get user's friend's posts.
  const handleGetFriendsPosts = async () => {
    let response = await axios.get(
      `http://localhost:3011/api/posts/${user._id}/friendsPosts`,
      { headers: { "x-auth-token": decodedUser } }
    );
    setFriendsPosts(response.data);
  };

  useEffect(() => {
    handleGetPosts();
    handleGetFriendsPosts();
  }, []);

  return (
    <div>
      <h1 className="container">Home Page for {user.name}!</h1>
      <UserInfoDisplay user={user} />

      <div>
        <PostForm setPosts={setPosts} />

        <div className="flex-row">
          <div className="width50">
            <PostList posts={friendsPosts} friendsList={true} />
          </div>
          <div className="width50">
            <PostList posts={posts} friendsList={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
