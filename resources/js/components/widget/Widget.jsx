import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { loadAuth } from "../../library/Auth";

const Widget = ({ type, listOrder, listUser }) => {
    let data;
 

    switch (type) {
        case "user":
            data = {
                title: "Số người dùng",
                isMoney: false,

                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "order":
            data = {
                title: "Tổng số đơn hàng",
                isMoney: false,

                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "earning":
            data = {
                title: "Tổng thu nhập",
                isMoney: true,
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(0, 128, 0, 0.2)",
                            color: "green",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {type === "order" && listOrder?.length}
                    {type === "user" && listUser?.length}
                    {type === "earning" &&
                        new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(
                            listOrder?.reduce(
                                (accumulator, currentValue) =>
                                    accumulator +
                                    Number(currentValue.TotalMoney),
                                0
                            )
                        )}
                </span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    {/* <KeyboardArrowUpIcon />
          {diff} % */}
                </div>
                {data.icon}
            </div>
        </div>
    );
};

export default Widget;
