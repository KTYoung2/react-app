import { Routes, Route, useLocation, useParams, Link, useMatch, useOutlet, useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import {  fetchCoinInfo, fetchCoinTickers } from "./api";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";


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

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.textColor};
`;

const Loader = styled.span`
    text-align: center;
    padding-top: 100px;
    display: block;
    font-size: 45px;
`;


const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
  }
`;

interface LocationState {
    state: {
        name: string,
        rank:number,
    }
};

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

const Back = styled.button`
    border: none;
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
`;

function Coin(){
    const { coinId } = useParams();
    const {state} = useLocation() as LocationState;  
    const navigate = useNavigate();
    const backBtn = () => {
        navigate(-1);
    };
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const { isLoading : infoLoading, data : infoData } = useQuery<InfoData>(
        ["info", coinId], ()=> 
            fetchCoinInfo(coinId!));
    const { isLoading : tickersLoading , data : tickersData} = useQuery<PriceData>(
        ["tickers", coinId], ()=>
             fetchCoinTickers(coinId!), {
                refetchInterval : 5000,
             }
             );
    const loading = infoLoading || tickersLoading;
    return(
        <Container>
            <Helmet>
                <title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</title>
            </Helmet>
        <Header>
            <Back onClick={backBtn}>
                <FontAwesomeIcon icon={faArrowLeft} size="xl" style={{color:"#FFD43B",}} /> 
                Back
            </Back>
            <Title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</Title>        
        </Header>
            { loading ? (
                <Loader>Loading 
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                </Loader> 
                ) : (
                        <span>Rank:{infoData?.rank}</span>
                    )}  <span>Symbol : ${infoData?.symbol}</span>          
                        <span>Price: ${tickersData?.quotes.USD.price.toFixed(3)}</span>
                        <hr />
                        <span>{infoData?.description}</span>
                        <hr />
                        <span>Total Suply : {tickersData?.total_supply}</span>
                <Tab isActive={chartMatch != null}>
                    <Link to="chart" state={{coinId}}>
                        Chart
                    </Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                    <Link to={"price"} state={{coinId}}>
                        Price
                    </Link>
                </Tab>
                <Routes>
                    <Route path="chart" element={<Chart />}></Route>
                    <Route path="price" element={<Price/>}></Route>
                </Routes>    
        </Container>
    )
};



export default Coin;