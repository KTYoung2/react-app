import { createBrowserRouter} from "react-router-dom";
import Home from "./ReactRouter/Home";
import About from "./ReactRouter/About";
import App from "./App";
import NotFound from "./ReactRouter/NotFound";
import User from "./ReactRouter/User";
import Followers from "./ReactRouter/Followes";


/* createBrowserRouter 는 
    라우터를 array 형식으로 표현할 수 있게 해줌 !
    모든 리액트 라우터 웹 프로젝트에 권장 되는 라우터임. 
    DOM History API를 사용하여 URL을 업데이트하고 스택을 관리한다. 
    App가 아닌, index에 설정.
*/
const router = createBrowserRouter([

    {
        // 로케이션 path  path : "/" 가 일치하면  element: <App /> 렌더
        path : "/",
        element: <App />,
        // children -> 유튜브 했을 때 Youngtube Reloaded URL 설계 생각해보기 !
        children: [
            {
                path: "",
                element : <Home />
            },
            {
                path :"about",
                element : <About />
            },
            {
                path:"users/:userId",
                element : <User />,
                children : [
                    {
                        path: "followers",
                        element: <Followers />
                    }
                ]
            }
        ],
        //에러 페이지도 설정 가능. 다른 멀쩡한 페이지가 에러의 영향을 받지 않게 해줌 
        errorElement: <NotFound />
    },
]);
  
  export default router;
  