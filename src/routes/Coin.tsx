import { useParams } from "react-router-dom";


function Coin() {
            //v6 이상 부터는 useParams 쓰는 순간 타입이 string or undefined 정의됨.
    const { coinId } = useParams();
    return ( 
        <h1>Coin : {coinId}</h1>
    );
  }
  
  export default Coin;
  