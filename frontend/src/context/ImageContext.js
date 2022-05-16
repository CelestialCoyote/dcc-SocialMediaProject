// Key imports
import React, { useState, useContext, createContext } from "react";

//  define the context
const imageContext = createContext();

// export the context file
export default imageContext;

//  export the context state
export const ImagesProvider = ({ children }) => {
  //   state variables
  // setting the user's photo
  const [user, setUser] = useState({});
  const [file, setFile] = useState();
};
