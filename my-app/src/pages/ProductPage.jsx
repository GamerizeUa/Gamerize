import { useLocation, useParams } from 'react-router-dom';

import { useEffect } from 'react';
import Product from '../components/product-page/Product.jsx';
import { useSelector } from 'react-redux';
import { selectProductById } from '../redux/selectors.js';

const ProductPage = () => {
    const { productID } = useParams();
    const product = useSelector((state) => selectProductById(state, productID));

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);
    const location = useLocation();

    return (
        <Product
            product={product}
            gamePickerFilters={location.state?.gamePickerFilters}
        >
            <Product.GamePickerBtn />
            <Product.Overview />
            <Product.Details />
            <Product.Rating />
            <Product.ReviewList />
            <Product.ReviewForm />
        </Product>
    );
};

export default ProductPage;
