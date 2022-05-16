import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./ImageUpload.css";

// TODOs
// 1) finish coding the form and being able to take a photo and a name of the photo
//  2) Update the state variables of PreviewURL and IsValid
// 3) Use FormData to convert the inputs into formdata that can be passed by axios.

const ImageUpload = (props) => {
  // state variables
  // previewing the URL
  const [previewUrl, setPreviewUrl] = useState();
  // checking if the image is a valid fileType
  const [isValid, setisValid] = useState(false);
  const [file, setFile] = useState();
  // console.log(previewUrl);

  // referencing the URL
  const filePickerRef = useRef();

  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    //   if there is no file put through the selector.
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  // Checking the file is the right size and even a file.
  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length == 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setisValid(true);
    } else {
      setisValid(false);
    }
  };

  const handleSubmitPhoto = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("image", file);

    try {
      await axios
        .put(
          `http://localhost:3011/api/users/${user._id}/updateUserImage`,
          form,
          {
            headers: { "x-auth-token": localStorage.getItem("token") },
          }
        )
        .then((res) => {
          localStorage.setItem("token", res.headers["x-auth-token"]);
          setUser(jwtDecode(localStorage.getItem("token")));
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  // Form portion, trying to capture the image and the name.
  return (
    <div id="imageUploadComponent">
      <form onSubmit={(event) => handleSubmitPhoto(event)}>
        <label>Photo</label>
        <input
          ref={filePickerRef}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={(event) => pickedHandler(event)}
        />
        <button type="submit">Submit button</button>
      </form>
    </div>
  );
};

export default ImageUpload;
