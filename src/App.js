import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: tomato;
  width: 100px; 
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: aqua; 
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
`;

function App() {
  return ( 
  <Father>
    <BoxOne />
      <Text>HELLO</Text>
    <BoxTwo />
  </Father>
  );
}

export default App;
