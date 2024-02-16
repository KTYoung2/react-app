

const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins(){
    const coins = await fetch(`${BASE_URL}/coins`).then((req) => req.json());
    return coins.slice(0,100);
};

export function fetchCoinInfo(coinId : string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then((req)=> req.json());
};

export function fetchCoinTickers(coinId : string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((req)=> req.json());
};


export function fetchCoinHistory(coinId:string){
    return fetch(
        `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
        ).then(respons => respons.json());
};