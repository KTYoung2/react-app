import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;


const Title = styled.h1`
    font-size: 50px;
    color: ${(props)=> props.theme.accentColor};

`;

const Loader = styled.span`
    text-align: center;
    padding-top: 100px;
    display: block;
    font-size: 35px;
`;


interface ICoinSatat{
    name : string;
}


function Coin() {
    const [loading , setLoding] = useState(true);
            //v6 이상 부터는 useParams 쓰는 순간 타입이 string or undefined 정의됨.
    const { coinId } = useParams();
    /*coin에서 보낸 state 가져오기 
        참고 https://blog.skby.net/%EB%A7%81%ED%81%AC-%EC%83%81%ED%83%9C-%EB%9D%BC%EC%9A%B0%ED%8C%85-link-state-routing/ */
    const { state } = useLocation();
    return ( 
        <Container>
        <Header>
            <Title>{state?.name || "Loading"}</Title>
        </Header>
        { loading ? <Loader>Loding ...</Loader> : null }
        </Container>
    );
  }
  
  export default Coin;
  