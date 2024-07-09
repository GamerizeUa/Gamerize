import { createContext } from 'react';
import { ProductOverview } from '../ProductOverview/ProductOverview.jsx';
import ProductDetails from './ProductDetails/ProductDetails.jsx';
import ReviewForm from './ReviewForm/ReviewForm.jsx';
import ReviewsList from './ReviewsList/ReviewsList.jsx';
import ProductRating from './product-rating/ProductRating';
import GamePickerBtn from './game-picker-btn/GamePickerBtn.jsx';

export const ProductContext = createContext(null);

const Product = ({ product, gamePickerFilters, children }) => {
    if (!product) return null;

    return (
        <div className="container">
            <ProductContext.Provider value={{ ...product, gamePickerFilters }}>
                {children}
            </ProductContext.Provider>
        </div>
    );
};

Product.GamePickerBtn = GamePickerBtn;
Product.Overview = ProductOverview;
Product.Details = ProductDetails;
Product.Rating = ProductRating;
Product.ReviewList = ReviewsList;
Product.ReviewForm = ReviewForm;

export default Product;
