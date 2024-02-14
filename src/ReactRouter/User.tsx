import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "./db";

/*
useParams

useParams 훅은 <Route path>와 일치하는 현재 URL에서 
동적 매개변수의 key/value 쌍 객체를 반환한다. 
하위 경로는 상위 경로에서 모든 매개변수를 상속한다. 

*/


function User() {
    const { userId } = useParams();
    return ( 
        <div>
            <h1>User with it {userId} is named: {users [Number(userId) - 1].name}
            </h1>
            <hr />
            <Link to="followers">See Followers</Link>
            <Outlet 
                context={{
                    nameOfMyUser : users [Number(userId) - 1].name,
                }}
            />
        </div>
    );
  }

/* 
  <Outlet />
  하위 경로 요소를 렌더링하려면 상위 경로 요소에서 <Outlet>을 사용해야 한다.
   이렇게 하면 하위 경로가 렌더링될 때 중첩된 UI가 표시될 수 있습니다. 
   상위 경로가 정확히 일치하면 하위 경로를 렌더링하거나 경로가 없으면 아무것도 렌더링하지 않습니다.
  (특정 페이지들끼리 공통적으로 보여줘야 하는 레이아웃이 있을 때 유용하게 사용할 수 있다)

   <Outlet /> 하위 경로와 자식 route들과 useParams처럼 소통할 수 있음. 
   array, text, ture, number, object 등등 뭐든 보낼 수 있음. (모든 하위 경로들이 다 참조함.)
  
  */

  
  export default User;
  