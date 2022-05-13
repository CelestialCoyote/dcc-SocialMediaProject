import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import PostForm from "../../components/PostForm/PostForm";
import axios from "axios";
import PostList from "../../components/PostList/PostList";


const HomePage = () => {
    //  state variables for comments
    const [posts, setPosts] = useState(null);
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");

    // grabbing all the posts from API.  
    const handleGetComments = async () => {
        let response = await axios
            .get(`http://localhost:3011/api/posts/${user._id}/allPosts`,
            {headers :{"x-auth-token": decodedUser}});
        setPosts(response.data);
        console.log("This is the response data", posts);
    };

    useEffect(() => {
        handleGetComments();
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
