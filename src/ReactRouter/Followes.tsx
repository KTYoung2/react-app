import { useOutletContext } from "react-router-dom";


interface IFollowers {
    nameOfMyUser : string;
}


function Followers() {
    //User 처럼 useParams 사용해 url을 참조하는 대신, OutletContext 사용해 받을 수 있음
    const { nameOfMyUser }= useOutletContext<IFollowers>();
       return ( 
        <h1>Here are {nameOfMyUser} Followers</h1>
    );

  }
  
  export default Followers;