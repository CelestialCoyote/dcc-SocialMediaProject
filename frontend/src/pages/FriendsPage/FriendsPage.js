import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import './FriendsPage.css';
import UserMapper from "../../components/UserMapper/UserMapper";
import FriendMapper from "../../components/FriendMapper/FriendMapper";
import FriendReqRecMapper from "../../components/FriendReqRecMapper/FriendReqRecMapper";
import FriendReqSentMapper from "../../components/FriendReqSentMapper/FriendReqSentMapper";


const FriendsPage = () => {

    const { user } = useContext(AuthContext);
    const [allUsers, setAllUsers] = useState([]);
    const [friends, setFriends] = useState(null);
    const [friendReqReceived, setFriendReqReceived] = useState(null);
    const [friendReqSent, setFriendReqSent] = useState(null);
    const decodedUser = localStorage.getItem("token");
    const baseUrl = 'http://localhost:3011/api/';

    useEffect(() => {
        handleGetAllUsers();
    }, [ friends ]);

    const handleGetAllUsers = async () => {
        let allUsers = await axios
            .get(`${baseUrl}friends/${user._id}/notCurrentUserNotFriends`,
                { headers: { "x-auth-token": decodedUser } });

        setAllUsers(allUsers.data);

        let friends = await axios
            .get(`${baseUrl}friends/${user._id}/allFriends/`,
                { headers: { "x-auth-token": decodedUser } });

        setFriends(friends.data);

        let friendRequestsReceived = await axios
            .get(`${baseUrl}friends/${user._id}/allFriendRequestsReceived/`,
                { headers: { "x-auth-token": decodedUser } });

        setFriendReqReceived(friendRequestsReceived.data);

        let friendRequestsSent = await axios
            .get(`${baseUrl}friends/${user._id}/allFriendRequestsSent/`,
                { headers: { "x-auth-token": decodedUser } });

        setFriendReqSent(friendRequestsSent.data);
    };

    return (

        <div id="friendsContainer">
            <div className="friendsCardContainer">
                <h2>People you may know</h2>
                <UserMapper allUsers={allUsers} setFriendReqSent={setFriendReqSent}/>
            </div>

            <div className="friendsCardContainer">
                <h2>Friends</h2>
                <FriendMapper friends={friends} setFriends={setFriends} />
            </div>

            <div className="friendsCardContainer">
                <h2>Friend Requests Received</h2>
                <FriendReqRecMapper
                    friendReqReceived={friendReqReceived} setFriendReqReceived={setFriendReqReceived}
                    setFriends={setFriends} setAllUsers
                />
            </div>

            <div className="friendsCardContainer">
                <h2>Friend Requests Sent</h2>
                <FriendReqSentMapper
                    friendReqSent={friendReqSent}
                />
            </div>

        </div>

    );
};


export default FriendsPage;
