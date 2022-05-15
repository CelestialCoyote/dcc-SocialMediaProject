import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from 'axios';
import './PendingFriendCard.css';


const PendingFriendCard = (props) => {
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");
    const baseUrl = 'http://localhost:3011/api/';

    let imagePath = `http://localhost:3011/${props.pendingFriend.image}`;

    const handleAcceptFriendRequest = async () => {

    }

    const handleDeclineFriendRequest = async () => {
        console.log('Current user: ', user.name);
        console.log('Current user _id: ', user._id);
        console.log('Pending friend: ', props.pendingFriend.name);
        console.log('Pending friend _id: ', props.pendingFriend._id);

        let newFriend = await axios
            .put(`${baseUrl}friends/${user._id}/removePendingFriend/${props.pendingFriend._id}`, user._id,
                { headers: { "x-auth-token": decodedUser } });

        console.log('New friend data: \n', newFriend.data);
        //props.setPendingFriends(newFriend.data.pendingFriends);

    }

    return (

        <div id="pendingFriendCard">

            <img id="profileImage" src={imagePath} alt="Profile" height={100} width={100} />
            <div>

                <p className="text">Name:</p>
                <p className="text">{props.pendingFriend.name}</p>
                <p className="text">Email:</p>
                <p className="text">{props.pendingFriend.email}</p>

                <div>
                    <label id="acceptFriendRequest" onClick={handleAcceptFriendRequest}>Accept</label>
                    <label id="declineFriendRequest" onClick={handleDeclineFriendRequest}>Decline</label>
                </div>

            </div>

        </div>

    );
}


export default PendingFriendCard;
