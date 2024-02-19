import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";


interface IChartProps{
    coinId : string;
}

interface IData {
    time_open:string;
    time_close:number;
    opne : number;
    hight : number;
    low: number;
    close: number;
    volume : number;
    market_cap : number;
}


function Chart(){
    const { state } = useLocation();
    const { coinId } = state as IChartProps;
    const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], ()=> fetchCoinHistory(coinId));
    const isDark = useRecoilValue(isDarkAtom);
    return(
        <div>
        { isLoading ? "Loading chart..." :   (
            <ApexChart 
                //차트 타입
                type="line"
                //실질적으로 들어갈 데이터 부분
                series={[
                    {
                        name : "Price",
                        data: data?.map((price)=> price.close) as number[],
                    },
                ]}
                options={{
                    theme : {
                        mode : isDark ? "dark" : "light",
                    },
                    chart : {
                        height : 500,
                        width : 500,
                        toolbar: {
                            show : false,
                        },
                    background : "transparent",
                    },
                    
                    stroke: {
                        curve : "smooth",
                        width: 5,
                    },
                    yaxis : {
                        show: false,
                    },
                    xaxis : {
                        categories: data?.map((date)=> {
                            const time = new Date(date.time_close * 1000)
                            return time.toLocaleDateString();
                        }),
                        axisBorder : {show : false},
                        axisTicks: {show : false},
                        labels : { show : false},
                    },
                    fill : {
                        type : "gradient", gradient : {gradientToColors:["#ffa502"], stops: [0,100]},
                    },
                    colors: ["#eb4d4b"],
                    tooltip : {
                        y : {
                            formatter : (value : number) => `$${value.toFixed(3)}`,
                        },
                    },
                }} 
            />
            )}
        </div>
    );
}


export default Chart;