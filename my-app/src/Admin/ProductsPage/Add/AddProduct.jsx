import { Form } from '../../../components/Form/Form';
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
import { productSchema } from '../validators/productSchema';
import { General } from '../FormSections/General';
import { Organization } from '../FormSections/Organization';
import { cn } from '../../../utils/classnames';
import buttons from '../../../assets/styles/buttons.module.css';

export const AddProduct = () => {
    const dispatch = useDispatch();
    const genres = useSelector(selectGenres);
    const categories = useSelector(selectCategories);
    const themes = useSelector(selectThemes);
    const languages = useSelector(selectLanguages);
    const defaultValues = {
        LanguageId: 1,
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
                contextProps={{ genres, categories, themes, languages }}
                className={styles['add-product__form']}
                cb={(product) => dispatch(addProduct({ product }))}
                defaultValues={defaultValues}
                validationSchema={productSchema}
            >
                <General />
                <Organization />
                <button
                    type="submit"
                    className={cn(buttons['btn'], buttons['btn--primary'])}
                >
                    Зберегти
                </button>
            </Form>
        </div>
    );
};
