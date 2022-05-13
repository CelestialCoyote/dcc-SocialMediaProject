import './UserCard.css';

const UserCard = (props) => {

    let imagePath = `http://localhost:3011/${props.user.image}`;
    console.log('This image path is:', imagePath);

    return (

        <div id="userCard">

            <img id="profileImage" src={imagePath} alt="Profile" height={100} width={100} />
            <div>
                <p className="text">Name:</p>
                <p className="text">{props.user.name}</p>
                <p className="text">Email:</p>
                <p className="text">{props.user.email}</p>
                <label className="userCardRequest">Send Friend Request</label>
            </div>
        
        </div>

    );
}


export default UserCard;