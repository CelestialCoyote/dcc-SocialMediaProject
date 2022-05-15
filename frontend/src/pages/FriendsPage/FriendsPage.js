import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import './FriendsPage.css';
import FriendMapper from "../../components/FriendMapper/FriendMapper";


const FriendsPage = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [friends, setFriends] = useState(null);
    const [pendingFriends, setPendingFriends] = useState(null);
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");

    const handleGetAllUsers = async () => {
        let allUsers = await axios
            .get(`http://localhost:3011/api/friends/${user._id}/notCurrentUserNotFriends`,
                { headers: { "x-auth-token": decodedUser } });

        setAllUsers(allUsers.data);

        let friends = await axios
            .get(`http://localhost:3011/api/friends/${user._id}/allFriends/`,
                { headers: { "x-auth-token": decodedUser } });
        
        setFriends(friends.data);

        let pendingFriends = await axios
            .get(`http://localhost:3011/api/friends/${user._id}/allPendingFriends/`,
                { headers: { "x-auth-token": decodedUser } });
        
        setPendingFriends(pendingFriends.data);
    };

    useEffect(() => {
        handleGetAllUsers();
    }, []);
    
    return (

        <div id="friendsContainer">
            <div className="friendsCardContainer">
                <h2>People you may know</h2>
                <FriendMapper allUsers={allUsers} />
            </div>
            <div className="friendsCardContainer">
                <h2>Friends</h2>
                <FriendMapper allUsers={friends} />
            </div>
            <div className="friendsCardContainer">
                <h2>Pending Friends</h2>
                <FriendMapper allUsers={pendingFriends} />
            </div>
        </div>

    );
};


export default FriendsPage;
