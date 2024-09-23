import { Form } from '@/components/Form/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumbs } from '@/components/ProductOverview/Breadcrumbs/Breadcrumbs';
import { fetchAllGenres } from '@/redux/categories/genresSlice';
import { fetchAllThemes } from '@/redux/categories/themesSlice';
import { fetchAllLanguages } from '@/redux/categories/languagesSlice';
import {
    selectCategories,
    selectGenres,
    selectLanguages,
    selectThemes,
} from '@/redux/selectors';
import { dispatchMultipleActions } from '@/utils/dispatchMultipleAtions';
import styles from '../products.module.css';
import { addProduct } from '@/redux/productsCatalogSlice';
import { fetchAllCategories } from '@/redux/categories/categoriesSlice';
import { productSchema } from '@/validators/productSchema';
import { General } from '../FormSections/General';
import { Organization } from '../FormSections/Organization';
import { cn } from '@/utils/classnames';
import buttons from '@/assets/styles/buttons.module.css';
import { productToFormData } from '@/utils/converters';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchTags = async () => {
    try {
        const res = await axios.get('https://gamerize.ltd.ua/api/Tag/GetAll');

        return res.data;
    } catch ({ response }) {
        return response.data;
    }
};

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
        NewTags: [],
    };
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

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

        fetchTags()
            .then((newTags) => setTags(newTags))
            .catch((e) => console.error(e));
    }, [dispatch]);

    const breadcrumbDetails = {
        name: ['Продукти', 'Новий продукт'],
        link: ['/admin/products', '/admin/products/add'],
    };

    return (
        <div>
            <Breadcrumbs page={breadcrumbDetails} isAdminPage={true} />
            <h1 className={styles['products__title']}>Новий продукт</h1>
            <Form
                contextProps={{ genres, categories, themes, languages, tags }}
                className={styles['products__form']}
                cb={(product) =>
                    dispatch(
                        addProduct({ product: productToFormData(product) })
                    ).then(() => navigate('/admin/products', { replace: true }))
                }
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
