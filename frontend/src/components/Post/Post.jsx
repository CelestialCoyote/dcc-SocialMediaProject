import React, { useState, useEffect } from 'react';

const Post = (props) => {
    // const [posts, SetPosts] = useState(props.PostInformation)
    return ( 
        <div>
            <h2>Reed Richards</h2>
            <p> {props.post.text} </p>
            <h1> Date: June 21st</h1>
        </div>
     );
}
 
export default Post;