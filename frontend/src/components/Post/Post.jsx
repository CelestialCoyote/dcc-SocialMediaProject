import AuthContext from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import './Post.css';


const Post = (props) => {

    const { user } = useContext(AuthContext);

    useEffect(() => {
        
    }, [props.post]);


    return (

        <div id="postContainer">

            <p className="marginOne">{props.post.text}</p>

            <div className="flex-row marginOne">
                <p>Date posted: {props.post.date}</p>

                <div className="flex-row">
                    <button>Like It!</button>
                    <p>Likes: {props.post.likes}</p>
                </div>

                {user.posts && user.posts.map(post => Object.values(post).includes(props.post._id)?<button key={post._id}>Edit</button>:null)}

            </div>

        </div>

    );
}

export default Post;
