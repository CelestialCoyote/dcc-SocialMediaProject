import './Post.css';


const Post = (props) => {
    return (

        <div id="postContainer">

            <p className="marginOne">{props.post.text}</p>

            <div className="flex-row marginOne">
                <p>Date posted: {props.post.date}</p>

                <div className="flex-row">
                    <button>Like It!</button>
                    <p>Likes: {props.post.likes}</p>
                </div>

                <button>Edit</button>
            </div>

        </div>

    );
}

export default Post;
