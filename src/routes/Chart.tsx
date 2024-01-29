import { stat } from "fs";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import { NamedTupleMember } from "typescript";
import ApexCharts from "react-apexcharts";
import Price from "./Price";

interface ChartProps {
    coinId: string;

};

interface IDate {
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
    const { coinId } = state as ChartProps;
    const { isLoading, data } = useQuery<IDate[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId), {
            refetchInterval : 10000,
        }
  );
    return (
       <div> { isLoading ? "Loding ... Chart...." : (
       <ApexCharts 
        type="line" 
        series={[
            {
                name : "Price",
                data : data?.map((price) => price.close) as number[],
            }

        ]}
        options={{
            theme : {
                mode : "dark",
            },
            chart: {
                height :500,
                width : 500,
                toolbar : {
                    show : false,
                },
                background: "#2f3640",
            },
            stroke: {
                curve : "smooth",
                width: 4,
            },
            yaxis : {
                show : false,
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
                type : "gradient", gradient : {gradientToColors:["#4834d4"], stops: [0,100]},
            },
            colors : ["#eb4d4b"],
            tooltip : {
                y : {
                    formatter: (value) => `${value.toFixed(2)}`,
                },
            },
        }}
        /> 
    )} 
    </div>

); 
};

export default Chart;