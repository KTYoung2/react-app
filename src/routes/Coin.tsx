import { Routes, Route, useLocation, useParams, Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
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
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    padding-top: 100px;
    display: block;
    font-size: 45px;
`;

const Tab = styled.span<{ isActive : boolean }>`
    color: ${(props)=> props.isActive ? props.theme.accentColor : props.theme.textColor}
`;


interface LocationState {
    state: {
        name: string;
        rank:number;
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



function Coin() {
    const { coinId } = useParams();
    const {state} = useLocation() as LocationState;  
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const { isLoading : infoLoading, data : infoData } = useQuery<InfoData>(
        ["info", coinId], ()=> 
            fetchCoinInfo(coinId!));
    const { isLoading : tickersLoading , data : tickersData} = useQuery<PriceData>(
        ["tickers", coinId], ()=>
             fetchCoinTickers(coinId!));
    const loading = infoLoading || tickersLoading;
    return (  
    <Container>
        <Header>
            <Title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</Title>        
        </Header>
            { loading ? (
                <Loader>Loading 
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                </Loader> 
                ) : (
                    <ul><h1>Rank:</h1>
                        <li>{infoData?.rank}</li>
                    </ul>
                )}
                <Tab isActive={chartMatch != null}>
                    <Link to={`/${coinId}/chart`}>
                        Chart
                    </Link>
                </Tab>
                <Tab isActive={priceMatch !== null}>
                    <Link to={`/${coinId}/price`}>
                        Price
                    </Link>
                </Tab>
                <Routes>
                    <Route path="chart" element={<Chart/>}></Route>
                    <Route path="price" element={<Price/>}></Route>
                </Routes>    
        </Container>
        );
};

export default Coin;