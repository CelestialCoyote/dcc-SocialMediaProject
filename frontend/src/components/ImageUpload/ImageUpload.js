import React, {useRef, useState, useEffect } from 'react';


const ImageUpload = (props) => {

    // state variables
    // previewing the URL
const [previewUrl, setPreviewUrl] = useState();
// checking if the image is a valid fileType
const [isValid, setisValidl] = useState(false);

// referencing the URL
const filePickerRef = useRef()

 useEffect( () =>{
    //   if there is no file put through
   if(!props.file) {
       return;
   }
   const fileReader = new fileReader();
   fileReader.onload = ()=>{
       setPreviewUrl(fileReader.result);
   };



 })



    return (  );
}
 
export default ImageUpload;



