import AuthContext from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import './Post.css';


const Post = (props) => {

    const { user } = useContext(AuthContext);

    useEffect(() => {

    }, [props.post]);

    return (

        <div id="postContainer">

            <p className="marginOne postText">{props.post.text}</p>

            <div className="flex-row marginOne">

                <p className="postText">Date posted: {props.post.date}</p>

                <div className="flex-row">

                    {props.friendsList ? <button>Like It</button> : null}


                    {/*{user.posts && user.posts
                        .filter(post => Object.values(post).includes(props.post._id))
                        //.map(post => Object.values(post).includes(props.post._id) ? null : <button key={post._id}>Like It!</button>)}
                        .map(post => Object.values(post).includes(props.post._id) ? null : <button key={post._id}>Like It!</button>)}*/}
                    <p>Likes: {props.post.likes}</p>
                </div>
                {!props.friendsList ? <button>Edit</button> : null}
                {/*{user.posts && user.posts.map(post => Object.values(post).includes(props.post._id) ? <button key={post._id}>Edit</button> : null)}*/}

            </div>

        </div>

    );
}

export default Post;
