import { useSelector } from 'react-redux';
import { selectViewsHistory } from '../../redux/selectors';
import ProductsCarousel from '../common-components/ProductsCarousel/ProductsCarousel';
import { useContext } from 'react';
import { ProductContext } from './Product';

export const RecentlyViewed = () => {
    const { id: productID } = useContext(ProductContext);
    const viewsHistory = useSelector((state) =>
        selectViewsHistory(state, productID)
    );

    if (viewsHistory.length === 0) return null;

    return (
        <ProductsCarousel
            productsList={viewsHistory}
            carouselTitle={'Нещодавно переглянуті'}
            productConfigurationObject={{
                isOldPrice: false,
                isDiscount: false,
                isCartView: false,
            }}
        />
    );
};
