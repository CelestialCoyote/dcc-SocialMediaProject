import { createContext, useState } from "react";

const AuthContext = createContext();

export default AuthContext;

export const PostsProvider = ({children}) => {

    const [posts, setPosts] = useState(null);


}