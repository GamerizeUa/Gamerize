import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Product from '../components/product-page/Product.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById } from '../redux/selectors.js';
import { addToHistory } from '../redux/viewsHistory.js';

const ProductPage = () => {
    const { productID } = useParams();
    const product = useSelector((state) => selectProductById(state, productID));
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    useEffect(() => {
        dispatch(addToHistory(product));
    }, [product, dispatch]);
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
            <Product.RecentlyViewed />
        </Product>
    );
};

export default ProductPage;
