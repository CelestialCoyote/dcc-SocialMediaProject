import FriendCard from '../FriendCard/FriendCard';
import './FriendMapper.css';


const FriendMapper = (props) => {

    return (

        <div id="friendMapper">
        
            <ul className="radiumUL">
                {props.friends && props.friends.map(friend =>
                    <li key={friend._id}>
                        <FriendCard friend={friend} setFriends={props.setFriends} />
                    </li>)}
            </ul>

        </div>

    );
}

export default FriendMapper;
