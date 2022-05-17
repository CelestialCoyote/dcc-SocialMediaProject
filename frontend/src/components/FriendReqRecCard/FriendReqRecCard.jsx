import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from 'axios';
import './FriendReqRecCard.css';


const FriendReqRecCard = (props) => {
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");
    const baseUrl = 'http://localhost:3011/api/';

    let imagePath = `http://localhost:3011/${props.friendRequest.image}`;

    const handleAcceptFriendRequest = async () => {
        let friendReq = await axios
            .put(`${baseUrl}friends/${user._id}/acceptFriendRequest/${props.friendRequest._id}`, user._id,
                { headers: { "x-auth-token": decodedUser } });

        props.setFriends(friendReq.data.friends);
    }

    const handleDeclineFriendRequest = async () => {
        let friendReq = await axios
            .put(`${baseUrl}friends/${user._id}/declineFriendRequest/${props.friendRequest._id}`, user._id,
                { headers: { "x-auth-token": decodedUser } });

        props.setFriendReqRecieved(friendReq.data.friendReqReceived);
    }

    return (

        <div id="requestReceivedCard">

            <img id="profileImage" src={imagePath} alt="Profile" height={100} width={100} />
            <div>

                <p className="text">Name:</p>
                <p className="text">{props.friendRequest.name}</p>
                <p className="text">Email:</p>
                <p className="text">{props.friendRequest.email}</p>

                <div>
                    <label id="acceptFriendRequest" onClick={handleAcceptFriendRequest}>Accept</label>
                    <label id="declineFriendRequest" onClick={handleDeclineFriendRequest}>Decline</label>
                </div>

            </div>

        </div>

    );
}


export default FriendReqRecCard;
