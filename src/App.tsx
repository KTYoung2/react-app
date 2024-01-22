import styled, { keyframes } from "styled-components";
import Circle from "./Circle";



function App() {
  return ( 
    <div>
      <Circle bgColor="teal" borderColor="yellow" />
      <Circle text="Hello" bgColor="tomato" />
    </div>
  );
}

export default App;
