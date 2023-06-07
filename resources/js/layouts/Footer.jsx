import React from "react";

import LinkUnderline from "../components/LinkUnderline";

const Footer = () => {
    return (
        <footer>
            <div className="py-6 shadow-[inset_0_1px_0_var(--shadow-light-color)]">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-12">
                            <div className="row">
                                <div className="col-lg-4 col-md-12">
                                    <div className="p-0 cursor-default transition-all duration-[300ms] ease-in">
                                        <div className="uppercase text-sm text-gray-700 font-medium">
                                            Về chúng tôi
                                        </div>
                                        <div className="pt-2">
                                            <ul>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>
                                                                Giới thiệu về
                                                                công ty.
                                                            </>
                                                        }
                                                    />
                                                </li>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>
                                                                Giới thiệu về
                                                                quản lí.
                                                            </>
                                                        }
                                                    />
                                                </li>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>
                                                                Giới thiệu các
                                                                phân loại.
                                                            </>
                                                        }
                                                    />
                                                </li>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>
                                                                Giới thiệu điều
                                                                khoản.
                                                            </>
                                                        }
                                                    />
                                                </li>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>
                                                                Giới thiệu cách
                                                                thức.
                                                            </>
                                                        }
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                    <div className="p-0 cursor-default transition-all duration-[300ms] ease-in">
                                        <div className="uppercase text-sm text-gray-700 font-medium">
                                            Về chúng tôi
                                        </div>
                                        <div className="pt-2">
                                            <ul>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>
                                                                Bạn cần loại sản
                                                                phẩm gì?
                                                            </>
                                                        }
                                                    />
                                                </li>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>
                                                                Bạn muốn gửi
                                                                thông tin?
                                                            </>
                                                        }
                                                    />
                                                </li>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>
                                                                Tìm kiếm thêm
                                                                thông tin
                                                            </>
                                                        }
                                                    />
                                                </li>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>
                                                                Giới thiệu sản
                                                                phẩm
                                                            </>
                                                        }
                                                    />
                                                </li>
                                                <li>
                                                    <LinkUnderline
                                                        href="/"
                                                        size="sm"
                                                        text={
                                                            <>Địa chỉ liên hệ</>
                                                        }
                                                    />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12">
                                    <div className="p-0 cursor-default transition-all duration-[300ms] ease-in">
                                        <div className="uppercase text-sm text-gray-700 font-medium">
                                            Ứng dụng của chúng tôi
                                        </div>
                                        <div className="pt-2">
                                            <img 
                                            style={{width: "60%"}}
                                                src="images/Screenshot 2023-05-19 155222.png"
                                                alt=""
                                                className="h-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-12">
                            <div className="flex flex-wrap justify-end">
                                <div className="flex justify-end">
                                    <div className="text-sm text-gray-700">
                                        Tư vấn mua hàng (Miễn phí)
                                        <p className="block text-[var(--primary-light-color)] mt-1">
                                            <a
                                                href="tel:1800 6928"
                                                className="text-2xl font-medium"
                                            >
                                                1800 6928
                                            </a>
                                            <span className="text-base font-medium">
                                                &nbsp;- Nhánh 1
                                            </span>
                                        </p>
                                    </div>
                                    <div className="ml-11 text-sm text-gray-700">
                                        Góp ý, khiếu nại (8h00-22h00)
                                        <p className="block text-[var(--primary-light-color)] mt-1">
                                            <a
                                                href="/"
                                                className="text-2xl font-medium"
                                            >
                                                1800 6928
                                            </a>
                                            <span className="text-base font-medium">
                                                &nbsp;- Nhánh 2
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="flex justify-end items-center uppercase text-gray-700 text-sm font-medium mb-3">
                                        Kết nối với chúng tôi
                                        <div className="flex pl-2">
                                            <a href="/" className="mr-3">
                                                <picture className="block max-w-[28px] h-[28px]">
                                                    <img
                                                        src="images/icon-facebook.png"
                                                        alt=""
                                                        className="h-full"
                                                    />
                                                </picture>
                                            </a>
                                            <a href="/">
                                                <picture className="block max-w-[28px] h-[28px]">
                                                    <img
                                                        src="images/icon-zalo.png"
                                                        alt=""
                                                        className="h-full"
                                                    />
                                                </picture>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-2 pb-3 shadow-[inset_0_1px_0_var(--shadow-light-color)]">
                <div className="container">
                    <div className="text-center text-gray-700">
                        <div className="text-sm">
                            © 2021 - 2023 Công ty Cổ Phần Dược Phẩm HealPlus Số
                            ĐKKD 0315275368 cấp ngày 17/09/2018 tại Sở Kế hoạch
                            Đầu tư TPHCM
                        </div>
                        <div className="text-sm">
                            Địa chỉ: 234 Cao Lỗ, Uy Nỗ, Đông Anh, Hà Nội
                            <a
                                href="tel:(028)73023456"
                                className="text-[var(--primary-light-color)]"
                            >
                                &nbsp;(028)73023456&nbsp;
                            </a>
                            - Email:
                            <a
                                href="mailto:sale@healplus.com"
                                className="text-[var(--primary-light-color)]"
                            >
                                &nbsp;sale@healplus.com&nbsp;
                            </a>
                            - Người quản lý nội dung: NCThinh
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
