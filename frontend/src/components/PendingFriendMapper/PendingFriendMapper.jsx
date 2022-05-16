import PendingFriendCard from '../PendingFriendCard/PendingFriendCard';
import './PendingFriendMapper.css';


const PendingFriendMapper = (props) => {

    return (

        <div id="pendingFriendMapper">
        
            <ul className="radiumUL">
                {props.pendingFriends && props.pendingFriends.map(pendingFriend =>
                    <li key={pendingFriend._id}>
                        <PendingFriendCard
                            pendingFriend={pendingFriend} setPendingFriends={props.setPendingFriends}
                            setFriends={props.setFriends} />
                    </li>)}
            </ul>

        </div>

    );
}

export default PendingFriendMapper;
