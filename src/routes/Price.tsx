import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";



const PriceList = styled.ul`
    padding-top: 20px;
    padding-bottom: 20px;
`;


const CoinPrice = styled.li`
    background-color:rgba(0, 0, 0, 0.5);
    color : ${(props)=> props.theme.accentColor};
    font-weight: bold;
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    a {
        display: flex;
        transition: color 0.3s ease-in;
        align-items: center;
    }

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
    color : ${(props)=> props.theme.textColor};
  }

`;



interface IPriceProps {
    coinId : string;
}


interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  };


function Price(){
    const { state } = useLocation();
    const { coinId } = state as IPriceProps;
    const { isLoading, data } = useQuery<IPriceData>(["tikcoin", coinId], ()=> fetchCoinTickers(coinId));

    return(
        <div>
             { isLoading ? "Loading price..." : (
              <PriceList>
                <CoinPrice>
                  <span>24 hours ago</span>
                  <span>{data?.quotes.USD.market_cap_change_24h}</span>
                  </CoinPrice>
                <CoinPrice>
                  <span>12 hours ago</span>
                  <span>{data?.quotes.USD.percent_change_12h}</span>
                </CoinPrice>
                <CoinPrice>
                  <span>6 hours ago</span>
                  <span>{data?.quotes.USD.percent_change_6h}</span>
                </CoinPrice>
                <CoinPrice>
                  <span>1 hours ago</span>
                  <span>{data?.quotes.USD.percent_change_1h}</span>
                </CoinPrice>
              </PriceList>
             )}
        </div>
    );
}


export default Price;