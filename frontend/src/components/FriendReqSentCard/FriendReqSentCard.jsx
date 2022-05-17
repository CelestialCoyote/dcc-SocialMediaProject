import './FriendReqSentCard.css';


const FriendReqSentCard = (props) => {

    let imagePath = `http://localhost:3011/${props.friendRequest.image}`;

    return (

        <div id="requestSentCard">

            <img id="profileImage" src={imagePath} alt="Profile" height={100} width={100} />
            <div>

                <p className="text">Name:</p>
                <p className="text">{props.friendRequest.name}</p>
                <p className="text">Email:</p>
                <p className="text">{props.friendRequest.email}</p>

                <div>
                    <label id="awaitingResponse" >Awaiting Response</label>
                </div>

            </div>

        </div>

    );
}


export default FriendReqSentCard;
