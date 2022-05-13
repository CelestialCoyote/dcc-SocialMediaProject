import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import FriendMapper from "../../components/FriendMapper/FriendMapper";


const FriendsPage = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [friends, setFriends] = useState(null);
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");

    const handleGetAllUsers = async () => {
        let response = await axios
            .get(`http://localhost:3011/api/users/`,
                { headers: { "x-auth-token": decodedUser } });
        setAllUsers(response.data);
        console.log("All users array", allUsers);
    };

    useEffect(() => {
        handleGetAllUsers();
    }, []);
    
    return (

        <div id="friendsContainer">
            <div>
                <h2>People you may know</h2>
                <FriendMapper allUsers={allUsers} />
            </div>
            <div>
                <h2>Friends</h2>
            </div>
            <div>
                <h2>Pending Friends</h2>
            </div>
        </div>

    );
};


export default FriendsPage;
