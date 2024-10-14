import { useContext } from 'react';
import { Input } from '@/components/Input/Input';
import { Textarea } from '@/components/Input/Textarea';
import { ImagePicker } from '@/components/Input/ImagePicker';
import { Select } from '@/components/Input/Select';
import { Multiselect } from '@/components/Input/Multiselect';
import { cn } from '@/utils/classnames';
import Image from '@/assets/icons/Image.svg';
import styles from './form.module.css';
import buttons from '@/assets/styles/buttons.module.css';
import { FormContext } from '@/components/Form/Form';

export const General = () => {
    const { control, languages, tags } = useContext(FormContext);

    return (
        <div className={styles['form__section']}>
            <h2 className={styles['form__title']}>Інформація про продукт</h2>
            <div className={styles['form__row']}>
                <Input
                    control={control}
                    type="text"
                    name="Name"
                    label={'Назва'}
                />
                <Input
                    control={control}
                    type="number"
                    name="Price"
                    label={'Ціна'}
                />
                <button className={cn(buttons['btn'], buttons['btn--primary'])}>
                    Додати знижку
                </button>
            </div>

            <hr />

            <h2 className={styles['form__title']}>Опис</h2>
            <div className={styles['form__column']}>
                <Textarea
                    control={control}
                    name="Description"
                    label="Назва"
                    rows={5}
                    cols={50}
                />
                <ImagePicker control={control} name="NewImages">
                    <img src={Image} alt="" />
                    <p>Завантажити фото</p>
                </ImagePicker>
            </div>

            <h2 className={styles['form__title']}>Характеристики</h2>
            <div className={styles['form__column']}>
                <Input
                    control={control}
                    type="number"
                    name="MinPlayers"
                    label={'Мінімальна кількість гравців'}
                />
                <Input
                    control={control}
                    type="number"
                    name="MaxPlayers"
                    label={'Максимальна кількість гравців'}
                />
                <Input
                    control={control}
                    type="number"
                    name="MinAge"
                    label={'Мінімальний вік'}
                />

                <Input
                    control={control}
                    type="number"
                    name="MinGameTimeMinutes"
                    label={'Мінімальний час гри'}
                />
                <Input
                    control={control}
                    type="number"
                    name="MaxGameTimeMinutes"
                    label={'Максимальний час гри'}
                />
                <Select
                    control={control}
                    options={languages.map((option) => ({
                        value: option.id,
                        name: option.name,
                    }))}
                    name="LanguageId"
                    label={'Мова'}
                />
                <Multiselect
                    control={control}
                    options={tags.map((tag) => ({
                        label: tag.name,
                        value: tag.id,
                    }))}
                    name="NewTags"
                    label={'Теги'}
                    id="tags-input"
                />
            </div>
        </div>
    );
};
