import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import React, { useEffect, useState } from "react";

const Featured = ({listOrder}) => {


    const currentDate = new Date();
    const monthNumber = currentDate.getMonth();
    const yearNumber = currentDate.getFullYear();

    const totalyear = listOrder.filter(
      (x) =>
          Number(x.TimeOrder?.substring(0, 4)) === yearNumber
  ).reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.TotalMoney),
      0
    )

    const totalNow = listOrder
        .filter(
            (x) =>
                Number(x.TimeOrder?.substring(5, 7)) === Number(monthNumber + 1)
        )
        .reduce(
            (accumulator, currentValue) =>
                accumulator + Number(currentValue.TotalMoney),
            0
        );

    


    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Tổng doanh thu trong năm {yearNumber} </h1>
                <MoreVertIcon fontSize="small" />
                
            </div>
            <p style={{display:"flex", color:"green", justifyContent:"center", marginTop: "20px", fontSize: "18px", fontWeight:"500"}} className="amount">
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(totalyear)}
                </p>
            <div className="bottom">
               
                <p className="title">Tổng bán tháng này</p>
                <p className="amount">
                    {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    }).format(totalNow)}
                </p>
                <div className="featuredChart">
                    <CircularProgressbar
                        value={totalNow/totalyear *100}
                        text={`${(totalNow/totalyear).toFixed(2)* 100}%`}
                        strokeWidth={5}
                    />
               
                </div>
                <p style={{fontSize: "12px", fontWeight:"400"}} className="title">Phần trăm doanh thu tháng so với cả năm</p>

                
                {/* <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Tháng trước</div>
                        {totalNow < totalLast ? <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format( totalLast - totalNow)}
                            </div>
                        </div>: <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div className="resultAmount">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format( totalNow - totalLast)}
                            </div>
                        </div>}
                    </div>
                    <div className="item">
                        <div className="itemTitle">2 Tháng trước</div>
                        {totalNow < total2Last ? <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(total2Last - totalNow )}
                            </div>
                        </div>: <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div className="resultAmount">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(totalNow - total2Last)}
                            </div>
                        </div>}
                    </div>
                </div> */}
                
            </div>
        </div>
    );
};

export default Featured;
