import { Outlet } from "react-router-dom";
import Header from "./ReactRouter/Header";

  /* 
  <Outlet />
  하위 경로 요소를 렌더링하려면 상위 경로 요소에서 <Outlet>을 사용해야 한다.
   이렇게 하면 하위 경로가 렌더링될 때 중첩된 UI가 표시될 수 있습니다. 
   상위 경로가 정확히 일치하면 하위 경로를 렌더링하거나 경로가 없으면 아무것도 렌더링하지 않습니다.
  (특정 페이지들끼리 공통적으로 보여줘야 하는 레이아웃이 있을 때 유용하게 사용할 수 있다)
  */

function App() {

  return ( 
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
