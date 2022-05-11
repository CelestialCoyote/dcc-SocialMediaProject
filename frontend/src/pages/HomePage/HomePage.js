import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import PostForm from "../../components/PostForm/PostForm";
import axios from "axios";
import PostList from "../../components/PostList/PostList";


const HomePage = () => {
  //  state variables for comments
  const [comments, setComments] = useState(null);

  


  const { user } = useContext(AuthContext);
  // grabbing all the posts from API.  
  const grabComments = async () => {
    let response = await axios.get(
      `http://localhost:3011/api/posts/${user._id}/allPosts`
    );
   setComments(response.data);
   console.log("This is the response data",comments);
  };

  useEffect(() => {
    // grabComments();
  }, []);

  return (
    <div>
      <h1 className="container">Home Page for {user.name}!</h1>
      {/* {comments[0] ?<h1 className="container">Home Page for {comments[0].text}!</h1>: null} */}
      {/* {comments && comments.map(comment =><h2>Comment Text: { comment.text}</h2>)} */}
      <button onClick={() => grabComments()}>Test Button</button>
      <PostForm />
      <PostList comments= {comments}/>

    </div>
  );
};

export default HomePage;
