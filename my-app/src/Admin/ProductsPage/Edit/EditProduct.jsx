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
import { fetchAllCategories } from '../../../redux/categories/categoriesSlice';
import { useParams } from 'react-router-dom';
import { editProduct } from '../../../redux/productsCatalogSlice';
import { productSchema } from '../validators/productSchema';
import { General } from '../FormSections/General';
import { Organization } from '../FormSections/Organization';
import { cn } from '../../../utils/classnames';
import buttons from '../../../assets/styles/buttons.module.css';

export const EditProduct = () => {
    const { productId } = useParams();
    const product = useSelector((state) =>
        state.productsCatalog.products.find(
            (product) => product.id == productId
        )
    );
    const dispatch = useDispatch();
    const genres = useSelector(selectGenres);
    const categories = useSelector(selectCategories);
    const themes = useSelector(selectThemes);
    const languages = useSelector(selectLanguages);

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

    if (!product) return null;

    const breadcrumbDetails = {
        name: ['Продукти', product.name],
        link: ['/admin/products', `/admin/products/edit/${product.id}`],
    };

    return (
        <div className={styles['add-product']}>
            <Breadcrumbs page={breadcrumbDetails} />
            <h1 className={styles['add-product__title']}>{product.name}</h1>
            <Form
                contextProps={{ genres, categories, themes, languages }}
                className={styles['add-product__form']}
                cb={(data) => dispatch(editProduct({ id: productId, ...data }))}
                defaultValues={{
                    Name: product.name,
                    Price: product.price,
                    Description: product.description,
                    MinPlayers: product.minPlayers,
                    MaxPlayers: product.maxPlayers,
                    MinAge: product.minAge,
                    MinGameTimeMinutes: product.minGameTimeMinutes,
                    MaxGameTimeMinutes: product.maxGameTimeMinutes,
                    LanguageId: product.language.id,
                    CategoryId: product.category.id,
                    ThemeId: product.theme.id,
                    GenreId: product.genre.id,
                }}
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
