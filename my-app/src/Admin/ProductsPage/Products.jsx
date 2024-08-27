import styles from './products.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import {
    fetchProducts,
    setPage,
    setFilters,
} from '../../redux/productsCatalogSlice';
import { Pagination } from '../Pagination/Pagination';
import { ProductHeader } from './Header/ProductHeader';
import { ProductListing } from './ProductListing';
import { selectProductsByQuery, selectCategories } from '../../redux/selectors';
import { ProductFilters } from './Filter/ProductFilters';
import { fetchAllCategories } from '../../redux/categories/categoriesSlice';

const fetchData = (page, pageSize, filters) => async (dispatch) => {
    await Promise.all([
        dispatch(fetchProducts({ page, pageSize, filters })),
        dispatch(fetchAllCategories()),
    ]);
};

const updateFilters = (newFilters) => async (dispatch) => {
    dispatch(setFilters(newFilters));
    dispatch(setPage(1));
};

export const Products = () => {
    const [query, setQuery] = useState('');
    const filterSelectorRef = useRef();
    const dispatch = useDispatch();

    const { products, page, totalPages, pageSize, filters, loading } =
        useSelector((state) => selectProductsByQuery(state, query));
    const categories = useSelector(selectCategories);

    const handleSearch = ({ target: { value } }) => {
        setQuery(value);
    };
    const handleShowFilters = () => {
        filterSelectorRef.current.showModal();
    };

    useEffect(() => {
        dispatch(fetchData(page, pageSize, filters));
    }, [dispatch, page, pageSize, filters]);

    return (
        <>
            <section className={styles['products']}>
                <ProductHeader
                    searchQuery={query}
                    handleSearch={handleSearch}
                    handleShowFilters={handleShowFilters}
                />
                <ProductListing products={products} loading={loading} />
            </section>
            <ProductFilters
                categories={categories}
                updateFilters={(newFilters) => {
                    dispatch(updateFilters(newFilters));
                }}
                ref={filterSelectorRef}
            />
            {!loading && (
                <Pagination
                    totalItems={pageSize * (totalPages - 1)}
                    totalPages={totalPages}
                    currentPage={page}
                    setCurrentPage={(nextPage) => dispatch(setPage(nextPage))}
                />
            )}
        </>
    );
};
