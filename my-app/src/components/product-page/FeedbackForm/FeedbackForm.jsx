import { useContext, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { ProductContext } from '../Product';
import { addFeedback } from '@/redux/productsCatalogSlice';
import useCheckAuth from '@/hooks/useCheckAuth';
import StarIcon from '@/assets/icons/StarIcon';
import styles from './FeedbackForm.module.css';
import { feedbackSchema } from '@/validators/feedbackSchema';

const getAccountInformation = async () => {
    const res = await axios.get('https://gamerize.ltd.ua/api/Account/profile', {
        withCredentials: true,
    });

    return res.data;
};

const FeedbackForm = () => {
    const [rate, setRate] = useState(null);
    const [hover, setHover] = useState(null);
    const { checkAuthentication } = useCheckAuth();
    const { id: productId } = useContext(ProductContext);
    const isAuthenticated = checkAuthentication();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(feedbackSchema),
    });

    const onSubmit = async (data) => {
        if (!isAuthenticated) return null;

        const { name: customerName } = await getAccountInformation();
        const createdDate = new Date().toISOString();
        const feedback = { ...data, customerName, createdDate, productId };

        dispatch(addFeedback(feedback))
            .then(unwrapResult)
            .then(() => reset({ text: '', rate: 0 }));
    };

    if (!isAuthenticated) return null;

    return (
        <section className={styles.feedbackForm}>
            <h3 className={styles.feedbackFormTitle}>Написати відгук</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className={styles.feedbackFormText}>Оцініть продукт</p>
                <div className={styles.rating}>
                    {[...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return (
                            <div key={index}>
                                <label>
                                    <input
                                        type="radio"
                                        name="rate"
                                        value={currentRating}
                                        {...register('rate')}
                                        className={styles.ratingItem}
                                        onClick={() => setRate(currentRating)}
                                    />
                                    <div
                                        className={styles.starIcon}
                                        onMouseEnter={() =>
                                            setHover(currentRating)
                                        }
                                        onMouseLeave={() => setHover(null)}
                                    >
                                        <StarIcon
                                            color={'#6566AC'}
                                            isEmpty={
                                                currentRating <= (hover || rate)
                                                    ? false
                                                    : true
                                            }
                                        />
                                    </div>
                                </label>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <p className={styles.feedbackFormText}>Відгук</p>
                    <div className={styles.textareaContainer}>
                        <textarea
                            name="text"
                            placeholder="Текст відгуку"
                            {...register('text')}
                            aria-invalid={!!errors.text}
                            className={styles.textarea}
                        />
                        <span className={styles.symbolsAmount}>
                            {`${watch('text') ? watch('text').length : 0}`}
                            /1500
                        </span>
                    </div>
                    <p className={styles.textareaError}>
                        {errors.text?.message}
                    </p>
                </div>
                <button className={styles.feedbackFormBtn}>Відправити</button>
            </form>
        </section>
    );
};

export default FeedbackForm;
