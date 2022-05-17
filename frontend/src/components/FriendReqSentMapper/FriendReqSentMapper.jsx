import FriendReqSentCard from '../FriendReqSentCard/FriendReqSentCard';
import './FriendReqSentMapper.css';


const FriendReqSentMapper = (props) => {

    return (

        <div id="pendingFriendMapper">
        
            <ul className="radiumUL">
                {props.friendReqSent && props.friendReqSent.map(friendRequest =>
                    <li key={friendRequest._id}>
                        <FriendReqSentCard
                            friendRequest={friendRequest}
                        />
                    </li>)}
            </ul>

        </div>

    );
}

export default FriendReqSentMapper;
