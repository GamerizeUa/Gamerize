import GamePicker from "@/pages/HomePage/GamePicker/GamePicker.jsx";
import ProductsCarousel from "@/components/ProductsCarousel/ProductsCarousel.jsx";
import { QuestioningForm } from "@/pages/HomePage/QuestioningForm/QuestioningForm.jsx";
import { SelectionOfGames } from "@/pages/HomePage/SelectionOfGames/SelectionOfGames.jsx";
import { Banner } from "@/pages/HomePage/Banner/Banner.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularAsync, getWithDiscountAsync, selectPopularProducts } from "../../redux/productsSlice.js";

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
