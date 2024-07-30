import { createContext } from 'react';
import { ProductOverview } from '../ProductOverview/ProductOverview.jsx';
import ProductDetails from './ProductDetails/ProductDetails.jsx';
import FeedbackForm from './FeedbackForm/FeedbackForm.jsx';
import FeedbackList from './FeedbackList/FeedbackList.jsx';
import ProductRating from './product-rating/ProductRating';
import GamePickerBtn from './game-picker-btn/GamePickerBtn.jsx';
import { RecentlyViewed } from './RecentlyViewed.jsx';

export const ProductContext = createContext(null);

const Product = ({ product, gamePickerFilters, children }) => {
    if (!product) return '';

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
Product.FeedbackList = FeedbackList;
Product.FeedbackForm = FeedbackForm;
Product.RecentlyViewed = RecentlyViewed;

export default Product;
