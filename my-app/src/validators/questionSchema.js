import * as yup from 'yup';

export const questionSchema = yup.object().shape({
    userName: yup.string().required("Введіть ім'я"),
    email: yup
        .string()
        .required('Введіть е-пошту')
        .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i,
            'Введіть коректну е-пошту'
        ),
    text: yup.string().required('Введіть запитання'),
});
