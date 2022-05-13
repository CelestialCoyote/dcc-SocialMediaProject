import Post from '../Post/Post';
import './PostList.css';


const PostList = (props) => {

    return (

        <div id="postListContainer">
        
            <ul className="radiumUL">
                {props.posts && props.posts.map(post => <li key={post._id}> <Post post={post} friendsList={props.friendsList} /> </li>)}
            </ul>

        </div>

    );
}

export default PostList;