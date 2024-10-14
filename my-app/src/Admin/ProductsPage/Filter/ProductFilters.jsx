import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/utils/classnames';
import styles from './filter.module.css';
import buttons from '@/assets/styles/buttons.module.css';
import { Input } from '@/components/Input/Input';
import { handleOverlayClick } from '@/utils/handlers';

const defaultValues = { minPrice: 200, maxPrice: 1500, categories: [] };

export const ProductFilters = forwardRef(function ProductFilters(
    { categories, updateFilters },
    ref
) {
    const {
        register,
        control,
        reset,
        handleSubmit: passData,
    } = useForm({
        defaultValues,
    });

    const handleSubmit = (data) => {
        const { minPrice, maxPrice, categories } = data;

        updateFilters({
            price: [
                {
                    min: minPrice,
                    max: maxPrice,
                },
            ],
            categories,
        });
    };
    const handleReset = () => reset(defaultValues);

    if (!categories) return null;

    return (
        <dialog
            className={styles['dialog']}
            ref={ref}
            onClick={(e) => handleOverlayClick(e, () => ref.current.close())}
        >
            <form action="" onSubmit={passData(handleSubmit)}>
                <div className={styles['dialog__container']}>
                    <fieldset>
                        <h2>Фільтрувати за ціною</h2>
                        <div className={styles['dialog__row']}>
                            <Input
                                control={control}
                                type={'number'}
                                name={'minPrice'}
                                label={'Від'}
                            />
                            <Input
                                control={control}
                                type={'number'}
                                name={'maxPrice'}
                                label={'До'}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <h2>Фільтрувати за категорією</h2>
                        <div className={styles['dialog__grid']}>
                            {categories?.map((category) => (
                                <label
                                    className={styles['dialog__field']}
                                    key={category.id}
                                >
                                    <input
                                        type="checkbox"
                                        value={category.id}
                                        {...register('categories')}
                                    />
                                    {category.name}
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>
                <div className={styles['dialog__actions']}>
                    <button
                        type="submit"
                        className={cn(
                            buttons.btn,
                            buttons['btn--primary'],
                            styles['dialog__action']
                        )}
                    >
                        Застосувати
                    </button>
                    <button
                        className={cn(
                            buttons.btn,
                            buttons['btn--secondary'],
                            styles['dialog__action']
                        )}
                        onClick={handleReset}
                    >
                        Скинути
                    </button>
                </div>
            </form>
        </dialog>
    );
});
