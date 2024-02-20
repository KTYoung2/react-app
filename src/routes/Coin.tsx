import { Link, Route, Routes, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  `;


const Title = styled.h1`
    display: flex;
    justify-items: center;
    padding-bottom: 50px;
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props)=> props.theme.borderColor};
  padding: 10px 20px;
  border-radius: 10px;

`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0;
    gap : 10px;
`;

const Tab = styled.span<{ isActive:boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color:${(props)=> props.theme.borderColor};
  border-radius: 10px;
  color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

const BackBtn = styled.button`
    font-size: 35px;
    border: none;
    background-color: ${(props)=> props.theme.bgColor};
    cursor: pointer;
`;

interface InfoData {
    id :string;
    name : string;
    symbol:string;
    rank: number;
    is_new: boolean;
    is_active:boolean;
    type: string;
    logo: string;
    description: string;
    message:string;
    open_source: boolean;
    started_at:string;
    development_status:string;
    hardware_wallet:boolean;
    proof_type:string;
    org_structure:string;
    hash_algorithm:string;
    first_data_at:string;
    last_data_at:string;
};


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



function Coin() {
    //v6 이상 부터는 useParams 쓰는 순간 타입이 string or undefined 정의됨.
    const { coinId } = useParams();
    /*coin에서 보낸 state 가져오기 
    참고 https://blog.skby.net/%EB%A7%81%ED%81%AC-%EC%83%81%ED%83%9C-%EB%9D%BC%EC%9A%B0%ED%8C%85-link-state-routing/ */
    const { state } = useLocation();
                                //coins와 다르게 fetcher함수에 인자가(coinId) 필요하니까
    const {isLoading : infoLoading , data : infoData} = useQuery<InfoData>
        (["info", coinId], () => fetchCoinInfo(coinId!));
    const {isLoading : tickersLoading , data : tickerData} = useQuery<IPriceData>
    (["tickers", coinId], () => fetchCoinTickers(coinId!));
    //쿼리 키는 고유 (오직하나)여야 하는데 중복이 되니까 고유키에 이름을 붙여준것.


    /*
        useMatch()의 인자로 url을 넘기면 해당 url과 일치할 경우 url의 정보를 반환하고, 
        일치하지 않을 경우 null을 반환한다.
    */
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const loading = infoLoading || tickersLoading;
    const navigate = useNavigate();
    const onClick = () => {
        navigate("/");
    };
    return ( 
        <Container>
        <Helmet>
            <title>{state?.name ? state.name : loading ? "Loading" : infoData?.name }</title>
        </Helmet>
        <Header>
            <BackBtn onClick={onClick}>
                <FontAwesomeIcon icon={faCircleChevronLeft} color={"#ffa502"} />
            </BackBtn>
            <Title>{state?.name ? state.name : loading ? "Loading" : infoData?.name }</Title>
        </Header>
        {loading ? (
        <Loader>Loading <FontAwesomeIcon icon={faSpinner} spinPulse /></Loader>
         ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickerData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickerData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickerData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
                <Link to={"chart"} state={{coinId}} >Chart</Link>
            </Tab>
          <Tab isActive={priceMatch !== null}>
             <Link to={"price"} state={{coinId}}>Price</Link>
          </Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart />} />
            <Route path="price" element={<Price />} />
          </Routes>
        </>
      )}
    </Container>
    );
  }
  
  export default Coin;
  