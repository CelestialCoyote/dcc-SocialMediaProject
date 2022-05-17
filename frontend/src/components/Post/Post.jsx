import { useEffect } from "react";
import './Post.css';
import LikeButton from "../LikeButton/LikeButton";


const Post = (props) => {

    useEffect(() => {

    }, [props.post]);

    return (

        <div id="postContainer">

            <p className="marginOne postText">{props.post.text}</p>

            <div className="flex-row marginOne">

                <p className="postText">Date posted: {props.post.date}</p>

                <div className="flex-row">

                    <p>Likes: {props.post.likes}</p>

                    {props.friendsList ? <LikeButton postID={props.post._id} post={props.post} /> : null}

                </div>

                {!props.friendsList ? <button>Edit</button> : null}

            </div>

        </div>

    );
}

{/*{user.posts && user.posts.map(post => Object.values(post).includes(props.post._id) ? <button key={post._id}>Edit</button> : null)}*/ }

{/*{user.posts && user.posts
    .filter(post => Object.values(post).includes(props.post._id))
    //.map(post => Object.values(post).includes(props.post._id) ? null : <button key={post._id}>Like It!</button>)}
    .map(post => Object.values(post).includes(props.post._id) ? null : <button key={post._id}>Like It!</button>)}*/}

export default Post;
