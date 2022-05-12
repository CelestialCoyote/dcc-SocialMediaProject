import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";


const PostForm = (props) => {

    const { user } = useContext(AuthContext);
    const defaultValues = { postText: "" };
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        defaultValues,
        postNewPost
    );

    async function postNewPost() {
        try {
            let response = await axios
                .post(`http://localhost:3011/api/posts/${user._id}/createPost`,
                    formData,
                    {headers :{"x-auth-token": localStorage.getItem('token')}})
                .then(res => response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <form className="form" onSubmit={handleSubmit}>
            <div>
                <label>Add Post
                    <input
                        type="text"
                        name="postText"
                        placeholder="What's on your mind?"
                        value={formData.postText}
                        onChange={handleInputChange} />
                </label>
                <label>
                    <input
                        aria-labelledby="Post"
                        type="Submit" />
                </label>
            </div>
        </form>
    );
};


export default PostForm;
