import * as yup from 'yup';

export const customerSchema = yup.object().shape({
    customerName: yup
        .string()
        .matches(
            /^[a-zA-Zа-яіА-ЯІ'\-]+\s[a-zA-Zа-яіА-ЯІ'\-]+$/i,
            "Введіть ім'я та прізвище"
        )
        .required("Введіть ім'я"),
    customerPhone: yup
        .string()
        .matches(
            /^\+380\d{9}$/,
            'Введіть коректний номер телефону (+380XXXXXXXXX)'
        )
        .required('Введіть номер телефону'),
    customerEmail: yup
        .string()
        .email('Введіть коректну електронну пошту')
        .required('Введіть електронну пошту'),
});
