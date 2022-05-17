import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import "../PostForm/PostForm.css";

const PostForm = (props) => {
  const BASE_URL = "http://localhost:3011/api/posts";
  const decodedUser = localStorage.getItem("token");
  const { user } = useContext(AuthContext);
  const defaultValues = { text: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    postNewPost
  );

  async function postNewPost() {
    try {
      await axios
        .post(`${BASE_URL}/${user._id}/createPost`, formData, {
          headers: { "x-auth-token": decodedUser },
        })
        .then((res) => props.setPosts(res.data));
      reset();
    } catch (error) {
      console.log("fail from PostForm ", error);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>
          Add Post
          <input
            type="text"
            name="text"
            placeholder="What's on your mind?"
            value={formData.text}
            className="PostTextArea"
            onChange={handleInputChange}
          />
        </label>
        <label>
          <input aria-labelledby="Post" type="Submit" />
        </label>
      </div>
    </form>
  );
};

export default PostForm;
