import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
    //리액트 쿼리의 모든 내부 작동을 시각화하는데 도움이 되며 오류발생시 디버깅 시간 절약가능 ! 
function App() {

  return ( 
    <>
    <Router />
    <ReactQueryDevtools initialIsOpen={true}/>
    </>
  );
}

export default App;
