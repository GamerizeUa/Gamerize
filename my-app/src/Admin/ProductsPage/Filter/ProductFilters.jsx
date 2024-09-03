import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '../../../utils/classnames';
import styles from '../assets/styles/filter.module.css';
import buttons from '../assets/styles/buttons.module.css';

const defaultValues = { minPrice: 200, maxPrice: 1500, categories: [] };

export const ProductFilters = forwardRef(function ProductFilters(
    { categories, updateFilters },
    ref
) {
    const {
        register,
        reset,
        handleSubmit: passData,
        formState: { errors },
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
        <dialog className={styles['dialog']} ref={ref}>
            <form action="" onSubmit={passData(handleSubmit)}>
                <div className={styles['dialog__container']}>
                    <fieldset>
                        <h2>Фільтрувати за ціною</h2>
                        <div className={styles['dialog__row']}>
                            <label>
                                Від
                                <input
                                    type="number"
                                    className={styles['dialog__field']}
                                    {...register('minPrice', {
                                        required: {
                                            value: true,
                                            message: 'This field is required',
                                        },
                                    })}
                                    aria-invalid={!!errors?.minPrice}
                                />
                                <p className={styles['dialog__error']}>
                                    {errors?.minPrice?.message}
                                </p>
                            </label>
                            <label>
                                До
                                <input
                                    type="number"
                                    className={styles['dialog__field']}
                                    {...register('maxPrice', {
                                        required: {
                                            value: true,
                                            message: 'This field is required',
                                        },
                                    })}
                                    aria-invalid={!!errors?.maxPrice}
                                />
                                <p className={styles['dialog__error']}>
                                    {errors?.maxPrice?.message}
                                </p>
                            </label>
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
