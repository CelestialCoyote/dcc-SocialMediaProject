import FriendReqRecCard from '../FriendReqRecCard/FriendReqRecCard';
import './FriendReqRecMapper.css';


const FriendReqRecMapper = (props) => {

    return (

        <div id="pendingFriendMapper">
        
            <ul className="radiumUL">
                {props.friendReqReceived && props.friendReqReceived.map(friendRequest =>
                    <li key={friendRequest._id}>
                        <FriendReqRecCard
                            friendRequest={friendRequest} setFriendReqRecieved={props.setFriendReqReceived}
                            setFriends={props.setFriends} />
                    </li>)}
            </ul>

        </div>

    );
}

export default FriendReqRecMapper;
