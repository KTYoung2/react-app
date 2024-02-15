import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//페이지가 새로고침 되지 않게 하기 위해 a href 아닌 -> Link 쓰는 것 
import styled from "styled-components";


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
    background-color: #f1f2f6;
    color : ${(props)=> props.theme.bgColor};
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
}

function Coins() {
    const [coins, setCoins] = useState<ICoins[]>([]);
    const [loading , setLoding] = useState(true);
    useEffect(()=>{
          (async()=>{
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoding(false);
        })()   
    }, [])
    return ( 
        <Container>
            <Header>
                <Title>COINS🪙</Title>
            </Header>
            { loading ? <Loader>Loding ...</Loader> : (
            <CoinsList>
                {coins.map((coin) =>(
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
  