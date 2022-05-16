// key imports for the file_upload
const multer = require("multer");
const uuid = require("uuid");

// define file types to be handled for images
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

//  handle the file itself

const fileUpload = multer({
  //  establish file limit(measurement in bytes)
  limits: 500000,
  //    storing the file
  storage: multer.diskStorage({
    //  where the file is stored in the server via filepath.
    destination: (req, file, callback) => {
      // takes in a filepath as a string for the images to be stored.
      callback(null, "uploads/images");
    },
    // the types of files being stored inside
    filename: (req, file, callback) => {
      //   file extensions
      const ext = MIME_TYPE_MAP[file.mimetype];
      // error handling
      callback(null, uuid.v1() + "." + ext);
    },
  }),

  //   a way to handle improper file uploading
  filefilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    // checking if the filetype is invalid.
    let error = isValid ? null : new Error("Invalid mime type!");
    callback(error, isValid);
  },
});

module.exports = fileUpload;
