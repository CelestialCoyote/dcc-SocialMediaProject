import Post from "../Post/Post";
const PostList = (props) => {
    return ( 
    //    TODO: find a way to display posts
       <ul>
            {props.comments && props.comments.map(comment =><p key={comment._id}>Comment Text: { comment.text}</p>)}
            
       </ul>

     );
}
 
export default PostList;