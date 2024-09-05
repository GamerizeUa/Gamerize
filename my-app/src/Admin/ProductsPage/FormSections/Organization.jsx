import { useContext } from 'react';
import { Select } from '../../../components/Input/Select';
import styles from '../assets/styles/form.module.css';
import { FormContext } from '../../../components/Form/Form';

export const Organization = () => {
    const { control, categories, genres, themes } = useContext(FormContext);

    return (
        <div className={styles['form__section']}>
            <h2 className={styles['form__title']}>Організація</h2>
            <div className={styles['form__column']}>
                <Select
                    control={control}
                    name="CategoryId"
                    label="Категорія"
                    options={categories.map((category) => ({
                        value: category.id,
                        name: category.name,
                    }))}
                />
                <Select
                    control={control}
                    name="ThemeId"
                    label="Тематика"
                    options={themes.map((theme) => ({
                        value: theme.id,
                        name: theme.name,
                    }))}
                />
                <Select
                    control={control}
                    name="GenreId"
                    label="Жанр"
                    options={genres.map((genre) => ({
                        value: genre.id,
                        name: genre.name,
                    }))}
                />
            </div>
        </div>
    );
};
