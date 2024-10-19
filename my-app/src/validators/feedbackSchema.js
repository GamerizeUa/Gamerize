import * as yup from 'yup';

export const feedbackSchema = yup.object().shape({
    text: yup
        .string()
        .min(2, 'Відгук має містити мінімум 2 символи')
        .max(1500, 'Відгук має містити максимум 1500 символів')
        .required('Введіть текст відгуку'),
    rate: yup.number().required('Вкажіть рейтинг'),
});
