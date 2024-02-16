import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
//페이지가 새로고침 되지 않게 하기 위해 a href 아닌 -> Link 쓰는 것 
import styled from "styled-components";
import { fetchCoins } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

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

const CoinsList = styled.ul`
    padding-top: 20px;
`;

const Coin = styled.li`
    background-color:rgba(0, 0, 0, 0.5);
    color : ${(props)=> props.theme.textColor};
    font-weight: bold;
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 15px;
    a {
        display: flex;
        transition: color 0.3s ease-in;
        align-items: center;
    }
    &:hover {
        a {
            color : #ffa502;
        }
    }
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 50px;
    color: ${(props)=> props.theme.accentColor};

`;

const Loader = styled.span`
    text-align: center;
    padding-top: 100px;
    display: block;
    font-size: 35px;
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;



interface ICoins{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
    isLoaing : boolean,
}

    /*  
        useQuery()
        리액트 쿼리 훅은 두개의 인자를 받는다.
        useQuery(쿼리의 고유키, fetcher함수); 
            ** fetcher함수는 Promise 꼭 반환해야한다.
        useQuery 훅이 fetchCoins (fetcher함수)를 부르고, 
        isLoaing 중이라면 Loding ...
        fetchCoins (fetcher함수)가 끝나면 리액트 쿼리는 fetcher함수의 데이터를
        { isLoaing, data } => data에 담아줌.

        쿼리는 서버에서 데이터를 가져오기 위해 모든 Promise기반 메서드(GET, POST)와 함께 사용가능.
        제공한 고유 키는 쿼리를 다시 가져오고, 캐싱하고 공유하는데 내부적으로 사용. 반환된 쿼리 결과에는
        템플릿 및 기타 데이터 사용에 필요한 쿼리에 대한 모든 정보가 포함돼 있음.
    */

function Coins() {
    const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);
    return ( 
        <Container>
        <Helmet>
            <title>COINS</title>
        </Helmet>
            <Header>
                <Title>COINS🪙</Title>
            </Header>
            { isLoading ? <Loader>Loding <FontAwesomeIcon icon={faSpinner} spinPulse /></Loader> : (
            <CoinsList>
                {data?.map((coin) =>(
                <Coin key={coin.id}> 
                    <Link to={`/${coin.id}`} state={ { name: coin.name }}>
                    <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                        {coin.name} &rarr;</Link>
                </Coin>
                ))}
            </CoinsList> 
            )}
        </Container>
        
 );
  }
  
  export default Coins;
  