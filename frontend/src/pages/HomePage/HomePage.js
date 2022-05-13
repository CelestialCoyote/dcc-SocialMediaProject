import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import PostForm from "../../components/PostForm/PostForm";
import axios from "axios";
import PostList from "../../components/PostList/PostList";
import './HomePage.css';


const HomePage = () => {
    //  state variables for comments
    const [posts, setPosts] = useState(null);
    const [friendsPosts, setFriendsPosts] = useState(null);
    //const [allPosts, setAllPosts] = useState(null);
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");

    // Get user's posts.  
    const handleGetPosts = async () => {
        let response = await axios
            .get(`http://localhost:3011/api/posts/${user._id}/allPosts`,
                { headers: { "x-auth-token": decodedUser } });
        setPosts(response.data);
        //console.log("This is user's post data", posts);
    };

    // Get user's friend's posts.  
    const handleGetFriendsPosts = async () => {
        let response = await axios
            .get(`http://localhost:3011/api/posts/${user._id}/friendsPosts`,
                { headers: { "x-auth-token": decodedUser } });
        setFriendsPosts(response.data);
        //setAllPosts(Array.prototype.push.apply(posts, friendsPosts));
        //console.log("This is the friends post data", friendsPosts);
        //console.log("This all posts for user and friends", allPosts);
    };

    //const handleGetAllPosts = () => {
    //    setAllPosts(Array.prototype.push.apply(posts, friendsPosts));
    //    //console.log("This all posts for user and friends", allPosts);
    //};


    useEffect(() => {
        handleGetPosts();
        handleGetFriendsPosts();
        //handleGetAllPosts();
    }, []);

    return (

        <div>
              
            <h1 className="container">Home Page for {user.name}!</h1>

            <div>
                 <img  className = "avatar_profile_pic" src={`http://localhost:3011/${user.image}`} />
                <PostForm setPosts={setPosts} />
                <PostList posts={posts} />
            </div>


        </div>

    );
};


export default HomePage;
