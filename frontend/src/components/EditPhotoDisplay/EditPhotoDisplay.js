import ImageUpload from "../ImageUpload/ImageUpload";

const EditPhoto = (props) => {
  // TODOs;
  //   1) Finish coding the ImageUpload component
  //  2) process the Multer data into form data(inside the ImageUpload)
  //    3) use Axios to update the photos and add them to the backend
  //   4)  make the data into form data as per Multer's request
  //   5) Lift state in such a way to avoid props drilling.
  //   6)

  //  BIG  TODO: create a function that takes in form data and pass it down into props. May need to move this down into ImageUpload

  //   const handlePhotoSubmit = async () => {
  //     //   define a form
  //     const imageForm = new FormData();
  //     // appending the form values
  //     form.append("image", file);
  //     await axios.post(`http://localhost:3011`);
  //   };

  return (
    <div>
      {/* PhotoUpload goes in here  */}
      <ImageUpload />
    </div>
  );
};

export default EditPhoto;
