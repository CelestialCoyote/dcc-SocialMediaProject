import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";


const PostForm = (props) => {

    const { user } = useContext(AuthContext);
    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(postNewPost);

    async function postNewPost() {
        try {
            await axios
                .post(`http://localhost:3011/api/posts`, formData)
                .then(res => res.data);
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
                        name="text"
                        placeholder="What's on your mind?"
                        value={formData.text}
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
