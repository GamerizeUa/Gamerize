import { Form } from '../Form/Form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumbs } from '../../../components/ProductOverview/Breadcrumbs/Breadcrumbs';
import { fetchAllGenres } from '../../../redux/categories/genresSlice';
import { fetchAllThemes } from '../../../redux/categories/themesSlice';
import { fetchAllLanguages } from '../../../redux/categories/languagesSlice';
import {
    selectCategories,
    selectGenres,
    selectLanguages,
    selectThemes,
} from '../../../redux/selectors';
import { dispatchMultipleActions } from '../../../utils/dispatchMultipleAtions';
import styles from '../assets/styles/add-product.module.css';
import { addProduct } from '../../../redux/productsCatalogSlice';
import { fetchAllCategories } from '../../../redux/categories/categoriesSlice';

export const AddProduct = () => {
    const dispatch = useDispatch();
    const genres = useSelector(selectGenres);
    const categories = useSelector(selectCategories);
    const themes = useSelector(selectThemes);
    const languages = useSelector(selectLanguages);
    const defaultValues = {
        Language: 1,
        CategoryId: 21,
        GenreId: 15,
        ThemeId: 12,
        Type: 'puzzle',
    };

    useEffect(() => {
        dispatch(
            dispatchMultipleActions(
                [
                    fetchAllGenres,
                    fetchAllThemes,
                    fetchAllLanguages,
                    fetchAllCategories,
                ],
                []
            )
        );
    }, [dispatch]);

    const breadcrumbDetails = {
        name: ['Продукти', 'Новий продукт'],
        link: ['/admin/products', '/admin/products/add'],
    };

    return (
        <div className={styles['add-product']}>
            <Breadcrumbs page={breadcrumbDetails} />
            <h1 className={styles['add-product__title']}>Новий продукт</h1>
            <Form
                genres={genres}
                categories={categories}
                themes={themes}
                languages={languages}
                className={styles['add-product__form']}
                cb={(product) => dispatch(addProduct({ product }))}
                defaultValues={defaultValues}
            >
                <Form.General />
                <Form.Organization />
            </Form>
        </div>
    );
};
