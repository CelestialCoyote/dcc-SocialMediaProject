import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from 'axios';
import './UserCard.css';


const UserCard = (props) => {
    const { user } = useContext(AuthContext);
    const decodedUser = localStorage.getItem("token");
    const baseUrl = 'http://localhost:3011/api/';

    let imagePath = `http://localhost:3011/${props.user.image}`;

    const handleSendFriendRequest = async () => {
        let newFriend = await axios
            .put(`${baseUrl}friends/${user._id}/sendFriendRequest/${props.user._id}`, user._id,
                { headers: { "x-auth-token": decodedUser } });

        props.setFriendReqSent(newFriend.data.friendReqSent);
    }

    return (

        <div id="userCard">

            <img id="profileImage" src={imagePath} alt="Profile" height={100} width={100} />
            <div>
                <p className="text">Name:</p>
                <p className="text">{props.user.name}</p>
                <p className="text">Email:</p>
                <p className="text">{props.user.email}</p>
                <label className="userCardRequest" onClick={handleSendFriendRequest}>Send Friend Request</label>
            </div>
        
        </div>

    );
}


export default UserCard;
