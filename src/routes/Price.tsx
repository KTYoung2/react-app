import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinTickers} from "./api";
import styled from "styled-components";

const PriceList = styled.ul`
    padding-top: 20px;
`;

const PriceItem = styled.li`
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



interface PriceProps {
    coinId: string;

};

interface PriceData {
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
    const { coinId } = state as PriceProps;
    const { isLoading , data } = useQuery<PriceData>(["tickers", coinId], () =>
            fetchCoinTickers(coinId), {
            refetchInterval : 10000,
        }
        );
    return (

        <div>
            { isLoading ? "Loding ... price...." : (
                <PriceList>
                    <PriceItem>최고가 ${data?.quotes.USD.ath_price.toFixed(3)}</PriceItem>
                    <PriceItem>24시간 전 ${data?.quotes.USD.market_cap_change_24h}</PriceItem>
                    <PriceItem>12시간 전 ${data?.quotes.USD.percent_change_12h}</PriceItem>
                    <PriceItem>1시간 전 ${data?.quotes.USD.percent_change_1h}</PriceItem>
                </PriceList>
            )}
        </div>
    )
};

export default Price;