import "./chart.scss";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { loadAuth } from "../../library/Auth";
import axios from "axios";

const Chart = ({ aspect, title,listOrder }) => {
    const currentDate = new Date();
    const yearNumber = currentDate.getFullYear();
    const data = [
        {
            name: "Tháng 1",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 1) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 2",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 2) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 3",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7)) === 3))
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 4",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 4) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 5",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 5) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 6",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 6)) 
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 7",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 7) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 8",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 8) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 9",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 9) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 10",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 10) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 11",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 11) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
        {
            name: "Tháng 12",
            Total: Number(
                listOrder
                    .filter((x) => Number(Number(x.TimeOrder?.substring(0,4))=== yearNumber &&  Number(x.TimeOrder?.substring(5, 7))=== 12) )
                    .reduce(
                        (accumulator, currentValue) =>
                            accumulator + Number(currentValue.TotalMoney),
                        0
                    )
            ),
        },
    ];

    return (
        <div className="chart">
            <div className="title">{title}</div>
            <ResponsiveContainer width="100%" aspect={aspect}>
                <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="#8884d8"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#8884d8"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray" />
                    <CartesianGrid
                        strokeDasharray="3 3"
                        className="chartGrid"
                    />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="Total"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#total)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
