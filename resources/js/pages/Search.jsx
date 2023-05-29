import React, { useEffect, useState } from "react";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Mask from "../layouts/Mask";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import ProductSeenSlide from "../components/ProductSeenSlide";
import Pagination from "../library/Pagination";

const Search = () => {
    const { keyword } = useParams();
    const [listProductSearch, setListProductSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentListProductSearch = listProductSearch.slice(
        firstPostIndex,
        lastPostIndex
    );


    useEffect(() => {
        axios
            .get(
                `/api/product/getSearchListProduct?keyword=${keyword.replace(
                    "-",
                    " "
                )}`
            )
            .then((response) => setListProductSearch(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <Header />
            <div>
                <div className="container ">
                    <div className="pt-6 pb-3">
                        <div className="text-2xl text-gray-800">
                            Tìm thấy
                            <strong className="font-bold">
                                &nbsp;{listProductSearch.length}&nbsp;
                            </strong>
                            kết quả với từ khoá "
                            <strong className="font-bold">
                                {keyword.replace("-", " ")}
                            </strong>
                            "
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="container">
                        <div className="py-6 text-center">
                            <div className="row row-cols-5 ">
                                {currentListProductSearch.map(
                                    (product, productIndex) => (
                                        <div
                                            key={productIndex}
                                            className="col mb-4"
                                        >
                                            <ProductItem
                                                info={product}
                                                animation={true}
                                                displayAddCart={true}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                            {listProductSearch.length > postsPerPage && (
                                <Pagination
                                    totalPosts={listProductSearch.length}
                                    postsPerPage={postsPerPage}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            )}
                        </div>
                    </div>
                   <div className="bg-[var(--secondary-color)] pt-6"><ProductSeenSlide/></div>
                </div>
            </div>
            <Footer />
            <Mask />
        </div>
    );
};

export default Search;
