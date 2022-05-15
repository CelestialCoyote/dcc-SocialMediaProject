import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from 'axios';
import './UserCard.css';


const UserCard = (props) => {
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");
    const baseUrl = 'http://localhost:3011/api/';

    let imagePath = `http://localhost:3011/${props.user.image}`;

    const handleFriendRequest = async () => {
        console.log('Current user: ', user.name);
        console.log('Current user _id: ', user._id);
        console.log('Pending friend: ', props.user.name);
        console.log('Pending friend _id: ', props.user._id);
        let newFriend = await axios
            .put(`${baseUrl}friends/${user._id}/addPendingFriend/${props.user._id}`,
                { headers: { "x-auth-token": decodedUser } });

        console.log('New friend data: \n', newFriend.data);
        //props.setPendingFriends(newFriend.data.pendingFriends);
    }

    return (

        <div id="userCard">

            <img id="profileImage" src={imagePath} alt="Profile" height={100} width={100} />
            <div>
                <p className="text">Name:</p>
                <p className="text">{props.user.name}</p>
                <p className="text">Email:</p>
                <p className="text">{props.user.email}</p>
                <label className="userCardRequest" onClick={handleFriendRequest}>Send Friend Request</label>
            </div>
        
        </div>

    );
}


export default UserCard;
