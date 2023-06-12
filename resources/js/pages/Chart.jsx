import Widget from "../components/widget/Widget";
import Featured from "../components/featured/Featured";
import Chart from "../components/chart/Chart";

import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
    Text,
    Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadAuth } from "../library/Auth";
import Sidebar from "../layouts/Sidebar";
import MobileNav from "../layouts/MobileNav";
import axios from "axios";
import { FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import DataTable from "../components/DataTable";

const ChartLayout = () => {
    
    const [userLogin, setUserLogin] = useState(null);
    const [listOrder, setListOrder] = useState([]);
    const [listUser, setListUser] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentDate = new Date();
    const yearNumber = currentDate.getFullYear();
   

    const loadListOrder = () => {
        axios
            .get("/api/order/getListOrder")
            .then((response) => setListOrder(response.data))
            .catch((error) => console.log(error));
    };

    const loadListUser = async () => {
        const response = await axios.get("/api/user/getAllUser");
        setListUser(response.data);
    };
    useEffect(() => {
        loadAuth((authData) => {
            if (authData != null && authData.IsAdmin == 1) {
                setUserLogin({
                    ...userLogin,
                    ...authData,
                });
                loadListOrder();
                loadListUser();
            } else navigate("/");
        });
    }, []);
   
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <Sidebar />
            <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
                <Sidebar onClose={() => onClose} isDrawerDisplay={false} />
                <Drawer
                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full"
                >
                    <DrawerContent>
                        <Sidebar onClose={onClose} isDrawerDisplay={true} />
                    </DrawerContent>
                </Drawer>
                <MobileNav onOpen={onOpen} />
                <Box ml={{ base: 0, md: 60 }} p="4">
                    <div className="bg-white px-5 pt-5 pb-5">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            mb={3}
                        >
                            <Text fontSize="xl" as="b">
                                Thống kê
                            </Text>
                        </Stack>
                        <div className="homeContainer">
                            <div
                                style={{
                                    display: "flex",
                                    padding: "20px",
                                    gap: "20px",
                                }}
                                className="widgets"
                            >
                                <Widget listOrder={listOrder} listUser= {listUser} type="user" />
                                <Widget listOrder={listOrder} listUser= {listUser} type="order" />
                                <Widget listOrder={listOrder} listUser= {listUser} type="earning" />
                   
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                }}
                                className="charts"
                            >
                                <Featured listOrder={listOrder}/>
                                <Chart 
                                listOrder={listOrder}
                                    title={`Biểu đồ doanh thu năm ${yearNumber}`}
                                    aspect={2 / 1}
                                />
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default ChartLayout;
