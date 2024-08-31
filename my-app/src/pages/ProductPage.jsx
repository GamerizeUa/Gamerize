import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Product from '../components/product-page/Product.jsx';
import { useDispatch, useSelector } from 'react-redux';
// import { selectProductById } from "../redux/selectors.js";
import { addToHistory } from '../redux/viewsHistory.js';
import { getProductById } from '../redux/productsSlice.js';

const ProductPage = () => {
    const { productID } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    // const product = useSelector((state) => selectProductById(state, productID));
    const { product, statusOfProduct } = useSelector(
        ({ carouselProducts }) => carouselProducts
    );
    const gamePickerFilters = location.state?.gamePickerFilters;

    if (statusOfProduct === 'failed') {
        navigate('/');
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
        if (!gamePickerFilters) dispatch(getProductById(productID));
    }, [productID, dispatch, gamePickerFilters]);

    useEffect(() => {
        dispatch(addToHistory(product));
    }, [product, dispatch]);

    return (
        <>
            <Product product={product} gamePickerFilters={gamePickerFilters}>
                <div className={'container'}>
                    <Product.GamePickerBtn />
                    <Product.Overview />
                    <Product.Details />
                    <Product.Rating />
                    <Product.FeedbackList />
                    <Product.FeedbackForm />
                </div>
                <Product.RecentlyViewed />
            </Product>
        </>
    );
};

export default ProductPage;
