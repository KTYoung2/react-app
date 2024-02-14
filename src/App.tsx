import { Outlet } from "react-router-dom";
import Header from "./ReactRouter/Header";


function App() {

  return ( 
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
