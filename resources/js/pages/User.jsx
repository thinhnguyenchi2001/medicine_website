import React, { useEffect } from "react";
import { useState } from "react";

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    InputGroup,
    InputRightElement,
    Center,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, DeleteIcon } from "@chakra-ui/icons";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Mask from "../layouts/Mask";

import { useNavigate } from "react-router-dom";
import { isAuth, userLogin } from "../library/Auth";
import axios from "axios";

const User = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showReNewPassword, setShowReNewPassword] = useState(false);
    const [listOrderUser, setListOrderUser] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const [fullName, setFullName] = useState(userLogin.FullName);
    const [phoneNumber, setPhoneNumber] = useState(userLogin.PhoneNumber);

    const [name, setName] = useState(userLogin.FullName);
    const [date, setDate] = useState(userLogin.DateOfBirth);
    const [phone, setPhone] = useState(userLogin.PhoneNumber);

    const [password, setPassword] = useState("");
    const [newPass, setNewPass] = useState("");
    const [cfPass, setCfPass] = useState("");

    const {
        isOpen: isOpenUserModal,
        onOpen: onOpenUserModal,
        onClose: onCloseUserModal,
    } = useDisclosure();

    const {
        isOpen: isOpenChangePassModal,
        onOpen: onOpenChangePassModal,
        onClose: onCloseChangePassModal,
    } = useDisclosure();

    const {
        isOpen: isOpenOrderDetailModal,
        onOpen: onOpenOrderDetailModal,
        onClose: onCloseOrderDetailModal,
    } = useDisclosure();

    useEffect(() => {
        if (isAuth) {
            getListOrderUser();
        } else navigate("/");
    }, []);

    const getListOrderUser = () => {
        axios
            .get(`/api/order/getListOrderUser?userId=${userLogin.Id}`)
            .then((response) => setListOrderUser(response.data))
            .catch((error) => console.log(error));
    };

    const editPassword = () => {
        if (!newPass || !cfPass || !password) {
            toast({
                title: "Thông báo: Vui lòng điền đầy đủ thông tin đổi mật khẩu!",
                position: "top-right",
                status: "error",
                isClosable: true,
            });
            return;
        }
        if (newPass !== cfPass) {
            toast({
                title: "Thông báo: Xác nhận mật khẩu không chính xác!",
                position: "top-right",
                status: "error",
                isClosable: true,
            });
            return;
        }
        if (password === newPass) {
            toast({
                title: "Thông báo: Mật khẩu mới bị trùng với mật khẩu cũ!",
                position: "top-right",
                status: "error",
                isClosable: true,
            });
            return;
        }
        axios
            .post(`/api/user/editPassword`, {
                userId: userLogin.Id,
                password: password,
                newPassword: newPass,
                cfPassword: cfPass,
            })
            .then((response) => {
                let loginResponse = response.data;
                let titleToast = loginResponse.IsSuccess
                    ? "Thông báo: Đăng nhập tài khoản thành công!"
                    : `Lỗi: ${loginResponse.ErrorMessage}`;
                let statusToast = loginResponse.IsSuccess ? "success" : "error";
                if (loginResponse.IsSuccess) {
                    onCloseChangePassModal();
                }
                toast({
                    title: titleToast,
                    position: "top-right",
                    status: statusToast,
                    isClosable: true,
                });
            })
            .catch((error) => console.log(error));
    };

    const renderOrderStatus = (status) => {
        switch (status) {
            case 0:
                return "Chưa xác nhận";
                break;
            case 1:
                return "Đã xác nhận";
                break;
            case 2:
                return "Đang giao hàng";
                break;
            case 3:
                return "Đã giao hàng";
                break;
            case 4:
                return "Đã bị huỷ";
                break;
        }
    };

    const editUser = () => {
        if (
            name === userLogin.FullName &&
            date === userLogin.DateOfBirth &&
            phone === userLogin.PhoneNumber
        ) {
            onCloseUserModal();
            return;
        }
        axios
            .post(`/api/user/editUser`, {
                userId: userLogin.Id,
                fullName: name,
                dateOfBirth: date,
                phoneNumber: phone,
            })
            .then((response) => {
                if (response.data.IsSuccess) getListOrderUser();
                toast({
                    title: response.data.IsSuccess
                        ? "Thông báo: Thay đổi thông tin thành công!"
                        : `Lỗi: ${response.data.ErrorMessage}`,
                    position: "top-right",
                    status: response.data.IsSuccess ? "success" : "error",
                    isClosable: true,
                });
            })
            .catch((error) => console.log(error));
    };

    const deleteOrder = (order) => {
        axios
            .get(`/api/order/deleteOrder?orderId=${order.Id}`)
            .then((response) => {
                if (response.data.IsSuccess) getListOrderUser();
                toast({
                    title: response.data.IsSuccess
                        ? "Thông báo: Huỷ đơn hàng thành công!"
                        : `Lỗi: ${response.data.ErrorMessage}`,
                    position: "top-right",
                    status: response.data.IsSuccess ? "success" : "error",
                    isClosable: true,
                });
            })
            .catch((error) => console.log(error));
    };

    return isAuth ? (
        <div>
            <Header />
            <picture className="block">
                <img
                    src="images/slide/2.png"
                    style={{
                        height: "250px",
                        width: "100%",
                        objectFit: "fill",
                    }}
                    alt=""
                />
            </picture>
            <div className="bg-white pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="mt-[-3.75rem] relative text-center">
                                <div className="inline-flex items-center justify-center bg-[var(--border-color)] rounded-[50%] text-white w-[7.5rem] h-[7.5rem] text-[3.5rem] leading-[3.5rem]">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                <p className="mt-3 text-xl font-medium text-[var(--primary-color)]">
                                    {fullName}
                                </p>
                                <p className="mt-1 text-base text-gray-700">
                                    {phoneNumber}
                                </p>
                                <Center>
                                    <Stack direction="row" spacing={1}>
                                        <a
                                            onClick={onOpenUserModal}
                                            className="hover:border-[var(--hover-outline-gray)] hover:bg-[var(--hover-outline-gray)] hover:text-white h-[2rem] border border-solid border-[var(--shadow-color)] rounded-xl text-[var(--outline-gray)] text-[1rem] leading-4 bg-white mt-1 inline-flex items-center justify-center transition-all duration-[300ms] ease-in-out cursor-pointer pl-3 pr-4"
                                        >
                                            <i className="fa-solid fa-pen-to-square mr-1"></i>
                                            <span className="font-medium leading-[100%] text-[1rem]">
                                                Chỉnh sửa
                                            </span>
                                        </a>
                                        <a
                                            onClick={onOpenChangePassModal}
                                            className="hover:border-[var(--hover-outline-gray)] hover:bg-[var(--hover-outline-gray)] hover:text-white h-[2rem] border border-solid border-[var(--shadow-color)] rounded-xl text-[var(--outline-gray)] text-[1rem] leading-4 bg-white mt-1 inline-flex items-center justify-center transition-all duration-[300ms] ease-in-out cursor-pointer pl-3 pr-4"
                                        >
                                            <i className="fa-solid fa-lock mr-1"></i>
                                            <span className="font-medium leading-[100%] text-[1rem]">
                                                Đổi mật khẩu
                                            </span>
                                        </a>
                                    </Stack>
                                </Center>
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="shadow-[0_0_0_1px_var(--shadow-color)] rounded-xl bg-white mt-8">
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>STT</Th>
                                            <Th>Thời gian đặt hàng</Th>
                                            <Th>Tổng tiền</Th>
                                            <Th>Trạng thái</Th>
                                            <Th>Thao tác</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {listOrderUser.map(
                                            (order, orderIndex) => (
                                                <Tr key={order.Id}>
                                                    <Td>{orderIndex + 1}</Td>
                                                    <Td>{order.TimeOrder}</Td>
                                                    <Td>
                                                        {new Intl.NumberFormat(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        ).format(
                                                            order.TotalMoney
                                                        )}
                                                    </Td>
                                                    <Td>
                                                        {renderOrderStatus(
                                                            order.Status
                                                        )}
                                                    </Td>
                                                    <Td>
                                                        <Stack
                                                            direction="row"
                                                            spacing={2}
                                                        >
                                                            <Button
                                                                leftIcon={
                                                                    <ViewIcon />
                                                                }
                                                                colorScheme="gray"
                                                                onClick={() => {
                                                                    setOrderDetail(
                                                                        order.OrderDetail
                                                                    );
                                                                    onOpenOrderDetailModal();
                                                                }}
                                                            >
                                                                Xem
                                                            </Button>
                                                            {order.Status ===
                                                            0 ? (
                                                                <Button
                                                                    leftIcon={
                                                                        <DeleteIcon />
                                                                    }
                                                                    colorScheme="red"
                                                                    onClick={() => {
                                                                        deleteOrder(
                                                                            order
                                                                        );
                                                                    }}
                                                                >
                                                                    Hủy
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    disabled={
                                                                        true
                                                                    }
                                                                    leftIcon={
                                                                        <DeleteIcon />
                                                                    }
                                                                    colorScheme="red"
                                                                    onClick={() => {
                                                                        deleteOrder(
                                                                            order
                                                                        );
                                                                    }}
                                                                >
                                                                    Hủy
                                                                </Button>
                                                            )}
                                                        </Stack>
                                                    </Td>
                                                </Tr>
                                            )
                                        )}
                                    </Tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpenUserModal} onClose={onCloseUserModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="p-[0.625rem_1.25rem] shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                        <div className="font-medium text-2xl text-gray-800">
                            Chỉnh Sửa Thông tin
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="pb-0 px-6 pt-6">
                        <div className="text-center">
                            <label className="inline-flex items-center justify-center bg-[var(--border-color)] rounded-[50%] text-white w-[5rem] h-[5rem] text-[2.25rem] leading-[100%]">
                                <i className="fa-solid fa-user"></i>
                            </label>
                        </div>
                        <div className="px-[4.75rem] mt-6">
                            <Input
                                value={name}
                                type="text"
                                className="mt-[1.125rem]"
                                variant="flushed"
                                placeholder="Nhập số điện thoại"
                                _focusVisible={{
                                    borderColor:
                                        "var(--primary-btn-hover-color)",
                                    boxShadow:
                                        "0px 1px 0px 0px var(--primary-btn-hover-color",
                                }}
                                name="phoneNumber"
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                            <Input
                                value={date}
                                className="mt-[1.125rem]"
                                variant="flushed"
                                type="date"
                                _focusVisible={{
                                    borderColor:
                                        "var(--primary-btn-hover-color)",
                                    boxShadow:
                                        "0px 1px 0px 0px var(--primary-btn-hover-color",
                                }}
                                name="dateOfBirth"
                                onChange={(event) =>
                                    setDate(event.target.value)
                                }
                            />
                            <Input
                                type="number"
                                value={phone}
                                className="mt-[1.125rem]"
                                variant="flushed"
                                placeholder="Nhập số điện thoại"
                                _focusVisible={{
                                    borderColor:
                                        "var(--primary-btn-hover-color)",
                                    boxShadow:
                                        "0px 1px 0px 0px var(--primary-btn-hover-color",
                                }}
                                name="phoneNumber"
                                onChange={(event) =>
                                    setPhone(event.target.value)
                                }
                            />
                        </div>
                    </ModalBody>
                    <Center>
                        <ModalFooter className="px-0 py-6">
                            <Button
                                onClick={() => {
                                    editUser();
                                    onCloseUserModal();
                                    setFullName(name);
                                    setPhoneNumber(phone);
                                }}
                                fontWeight="400"
                                textTransform="uppercase"
                                background="var(--primary-medium-color)"
                                color="white"
                                _hover={{
                                    background:
                                        "var(--primary-btn-hover-color)",
                                }}
                                _active={{
                                    boxShadow:
                                        "0 0 0 1.6px var(--primary-light-color)",
                                }}
                            >
                                Cập nhật thông tin
                            </Button>
                        </ModalFooter>
                    </Center>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isOpenChangePassModal}
                onClose={onCloseChangePassModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="p-[0.625rem_1.25rem] shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                        <div className="font-medium text-2xl text-gray-800">
                            Đổi Mật Khẩu
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="pb-0 px-6 pt-6">
                        <div className="text-center">
                            <label className="inline-flex items-center justify-center bg-[var(--border-color)] rounded-[50%] text-white w-[5rem] h-[5rem] text-[2.25rem] leading-[100%]">
                                <i className="fa-solid fa-user-lock"></i>
                            </label>
                        </div>
                        <div className="px-[4.75rem] mt-6">
                            <InputGroup className="mt-[1.125rem]">
                                <Input
                                    value={password}
                                    variant="flushed"
                                    placeholder="Nhập mật khẩu cũ"
                                    type={showOldPassword ? "text" : "password"}
                                    _focusVisible={{
                                        borderColor:
                                            "var(--primary-btn-hover-color)",
                                        boxShadow:
                                            "0px 1px 0px 0px var(--primary-btn-hover-color",
                                    }}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <InputRightElement>
                                    {showOldPassword ? (
                                        <ViewOffIcon
                                            onClick={() =>
                                                setShowOldPassword(
                                                    !showOldPassword
                                                )
                                            }
                                        />
                                    ) : (
                                        <ViewIcon
                                            onClick={() =>
                                                setShowOldPassword(
                                                    !showOldPassword
                                                )
                                            }
                                        />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                            <InputGroup className="mt-[1.125rem]">
                                <Input
                                    value={newPass}
                                    variant="flushed"
                                    placeholder="Nhập mật khẩu mới"
                                    type={showNewPassword ? "text" : "password"}
                                    _focusVisible={{
                                        borderColor:
                                            "var(--primary-btn-hover-color)",
                                        boxShadow:
                                            "0px 1px 0px 0px var(--primary-btn-hover-color",
                                    }}
                                    onChange={(e) => setNewPass(e.target.value)}
                                />
                                <InputRightElement>
                                    {showNewPassword ? (
                                        <ViewOffIcon
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                        />
                                    ) : (
                                        <ViewIcon
                                            onClick={() =>
                                                setShowNewPassword(
                                                    !showNewPassword
                                                )
                                            }
                                        />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                            <InputGroup className="mt-[1.125rem]">
                                <Input
                                    value={cfPass}
                                    variant="flushed"
                                    placeholder="Nhập lại mật khẩu mới"
                                    type={
                                        showReNewPassword ? "text" : "password"
                                    }
                                    _focusVisible={{
                                        borderColor:
                                            "var(--primary-btn-hover-color)",
                                        boxShadow:
                                            "0px 1px 0px 0px var(--primary-btn-hover-color",
                                    }}
                                    onChange={(e) => setCfPass(e.target.value)}
                                />
                                <InputRightElement>
                                    {showReNewPassword ? (
                                        <ViewOffIcon
                                            onClick={() =>
                                                setShowReNewPassword(
                                                    !showReNewPassword
                                                )
                                            }
                                        />
                                    ) : (
                                        <ViewIcon
                                            onClick={() =>
                                                setShowReNewPassword(
                                                    !showReNewPassword
                                                )
                                            }
                                        />
                                    )}
                                </InputRightElement>
                            </InputGroup>
                        </div>
                    </ModalBody>
                    <Center>
                        <ModalFooter className="px-0 py-6">
                            <Button
                                fontWeight="400"
                                textTransform="uppercase"
                                background="var(--primary-medium-color)"
                                color="white"
                                _hover={{
                                    background:
                                        "var(--primary-btn-hover-color)",
                                }}
                                _active={{
                                    boxShadow:
                                        "0 0 0 1.6px var(--primary-light-color)",
                                }}
                                onClick={() => {
                                    editPassword();
                                }}
                            >
                                Cập nhật mật khẩu
                            </Button>
                        </ModalFooter>
                    </Center>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isOpenOrderDetailModal}
                onClose={onCloseOrderDetailModal}
                size="6xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="p-[0.625rem_1.25rem] shadow-[inset_0px_-1px_0px_var(--shadow-light-color)]">
                        <div className="font-medium text-2xl text-gray-800">
                            Chi Tiết Đơn Hàng
                        </div>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className="pb-0 px-6 pt-6">
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>STT</Th>
                                    <Th>Tên sản phẩm</Th>
                                    <Th>Ảnh</Th>
                                    <Th>Số lượng mua</Th>
                                    <Th>Thao tác</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {orderDetail.map((item, index) => (
                                    <Tr key={item.Id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.ProductInfo.Name}</Td>
                                        <Td>
                                            <img
                                                src={
                                                    item.ProductInfo
                                                        .ImageAvatarUrl
                                                }
                                                alt=""
                                                className="w-10 h-10"
                                            />
                                        </Td>
                                        <Td>{item.BuyQuantity}</Td>
                                        <Td>
                                            <a
                                                href={`/product/${item.ProductId}`}
                                                target="_blank"
                                            >
                                                <Button
                                                    leftIcon={<ViewIcon />}
                                                    colorScheme="gray"
                                                >
                                                    Xem
                                                </Button>
                                            </a>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </ModalBody>
                    {/* <Center>
                        <ModalFooter className="px-0 py-6">
                            <Button
                                fontWeight="400"
                                textTransform="uppercase"
                                background="var(--primary-medium-color)"
                                color="white"
                                _hover={{
                                    background:
                                        "var(--primary-btn-hover-color)",
                                }}
                                _active={{
                                    boxShadow:
                                        "0 0 0 1.6px var(--primary-light-color)",
                                }}
                            >
                                Cập nhật
                            </Button>
                        </ModalFooter>
                    </Center> */}
                </ModalContent>
            </Modal>
            <Footer />
            <Mask />
        </div>
    ) : (
        <></>
    );
};

export default User;
