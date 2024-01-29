import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "./api";




const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height : 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul`
    padding-top: 20px;
`;

const Coin = styled.li`
    background-color: #dcdde1;
    color: ${(props)=> props.theme.bgColor};
    font-weight: bold;
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        transition: color 0.2s ease-in;
        
    }
    &:hover {
        a {
            color:${(props)=> props.theme.accentColor} ;
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    padding-top: 100px;
    display: block;
    font-size: 45px;
`;


const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
};

function Coins() {
    const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
/*
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoding] = useState(true);
    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0,100));
            setLoding(false);
        }) ()     
    }, []);
*/
    return ( 
    <Container>
            <Helmet>
                <title>CoinS</title>
            </Helmet>
        <Header>
        <Title>CoinS🪙</Title> 

        </Header>
        { isLoading ? (
        <Loader>Loading <FontAwesomeIcon icon={faSpinner} spinPulse />
        </Loader>
      ) : (
        <CoinsList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} 
                    state={ { name: coin.name } }>
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                    {coin.name} &rarr;
                </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;