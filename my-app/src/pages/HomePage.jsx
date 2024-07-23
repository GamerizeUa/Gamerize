import GamePicker from "../components/landing-page/GamePicker/GamePicker";
import ProductsCarousel from "../components/common-components/ProductsCarousel/ProductsCarousel";
import { QuestioningForm } from "../components/landing-page/QuestioningForm/QuestioningForm.jsx";
import { SelectionOfGames } from "../components/landing-page/SelectionOfGames/SelectionOfGames.jsx";
import { Banner } from "../components/landing-page/Banner/Banner.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularAsync, getWithDiscountAsync, selectPopularProducts } from "../redux/homeCarouselProductsSlice.js";

const HomePage = () => {
    const dispatch = useDispatch();
    const popularProducts = useSelector(({carouselProducts : {popularProducts}}) => popularProducts);
    const productsWithDiscount = useSelector(({carouselProducts : {productsWithDiscount}}) => productsWithDiscount);
    
    useEffect(() => {
        dispatch(getPopularAsync(10));
        dispatch(getWithDiscountAsync(10));
    }, []);

    return (
        <>
            <GamePicker />
            <ProductsCarousel
                productsList={popularProducts}
                carouselTitle={"Популярні товари"}
                productConfigurationObject={{
                    isDiscount: false,
                    isCartView: false,
                }}
            />
            <ProductsCarousel
                productsList={productsWithDiscount}
                carouselTitle={"Розпродаж"}
                productConfigurationObject={{
                    isDiscount: true,
                    isCartView: false,
                }}
            />
            <Banner />
            <SelectionOfGames />
            <QuestioningForm />
        </>
    );
};

export default HomePage;
