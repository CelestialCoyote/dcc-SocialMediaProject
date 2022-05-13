import UserCard from '../UserCard/UserCard';
import './FriendMapper.css';


const FriendMapper = (props) => {

    return (

        <div id="friendMapper">
        
            <ul className="radiumUL">
                {props.allUsers && props.allUsers.map(user => <li key={user._id}> <UserCard user={user} /> </li>)}
            </ul>

        </div>

    );
}

export default FriendMapper;