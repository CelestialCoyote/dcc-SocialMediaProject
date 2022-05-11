import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import PostForm from '../../components/PostForm/PostForm';


const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (

    <div>
        <h1 className="container">Home Page for {user.name}!</h1>
        <PostForm />
    </div>

  );

};


export default HomePage;
