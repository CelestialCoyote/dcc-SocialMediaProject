import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from 'axios';
import './FriendCard.css';


const FriendCard = (props) => {
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");
    const baseUrl = 'http://localhost:3011/api/';

    let imagePath = `http://localhost:3011/${props.friend.image}`;

    const handleDeleteFriend = async () => {
        let friendToDelete = await axios
            .put(`${baseUrl}friends/${user._id}/friendToDelete/${props.friend._id}`, user._id,
                { headers: { "x-auth-token": decodedUser } });

        props.setFriends(friendToDelete.data.friends);
    }

    return (

        <div id="userCard">

            <img id="profileImage" src={imagePath} alt="Profile" height={100} width={100} />
            <div>
                <p className="text">Name:</p>
                <p className="text">{props.friend.name}</p>
                <p className="text">Email:</p>
                <p className="text">{props.friend.email}</p>
                <label id="deleteFriend" onClick={handleDeleteFriend}>Delete Friend</label>
            </div>
        
        </div>

    );
}


export default FriendCard;