import UserCard from '../UserCard/UserCard';
import './UserMapper.css';


const UserMapper = (props) => {

    return (

        <div id="userMapper">
        
            <ul className="radiumUL">
                {props.allUsers && props.allUsers.map(user =>
                    <li key={user._id}>
                        <UserCard user={user} />
                    </li>)}
            </ul>

        </div>

    );
}

export default UserMapper;
