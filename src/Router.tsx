import { createBrowserRouter } from "react-router-dom";
import Root from "./Root"; 
import About from "./screens/About"; 
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import User from "./screens/users/User";
import Followers from "./screens/users/Follower";


const router = createBrowserRouter([
    {
        path: "/",
        element : <Root />,
        children: [
            {
                path:"",
                element: <Home />,
            },
            {
                path:"about",
                element: <About />,
            },
            {
                path:"users/:userId",
                element: <User />,
                children:[
                    {
                        path:"follower",
                        element: <Followers />,
                    },
                ]
            }
        ],
        errorElement : <NotFound />,
    },
]);

export default router;


