import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Введіть е-пошту')
        .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i,
            'Введіть коректну е-пошту'
        ),
    password: yup.string().required('Введіть пароль'),
});

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required("Введіть ім'я та прізвище")
        .matches(
            /^[a-zA-Zа-яіА-ЯІ'\-]+\s[a-zA-Zа-яіА-ЯІ'\-]+$/i,
            "Введіть ім'я та прізвище"
        ),
    email: yup
        .string()
        .required('Введіть е-пошту')
        .matches(
            /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i,
            'Введіть коректну е-пошту'
        ),
    password: yup
        .string()
        .required('Введіть пароль')
        .matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
            'Мінімум 6 символів, цифра, велика та мала літери, спецсимвол'
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Паролі повинні співпадати')
        .required('Повторіть пароль'),
});

export const newPasswordSchema = (emailParam) => {
    if (emailParam)
        return yup.object().shape({
            email: yup
                .string()
                .required('Введіть е-пошту')
                .matches(
                    /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i,
                    'Введіть коректну е-пошту'
                ),
            password: yup
                .string()
                .required('Введіть пароль')
                .matches(
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
                    'Мінімум 6 символів, цифра, велика та мала літери, спецсимвол'
                ),
            repeatPassword: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Паролі повинні співпадати')
                .required('Повторіть пароль'),
        });

    return yup.object().shape({
        newPassword: yup
            .string()
            .required('Введіть пароль')
            .matches(
                /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
                'Мінімум 6 символів, цифра, велика та мала літери, спецсимвол'
            )
            .test(
                'passwords-differ',
                'Новий пароль збігається зі старим',
                function (value) {
                    return value !== this.parent.password;
                }
            ),
        password: yup
            .string()
            .required('Введіть пароль')
            .matches(
                /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{6,}$/,
                'Мінімум 6 символів, цифра, велика та мала літери, спецсимвол'
            ),
        repeatNewPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Паролі повинні співпадати')
            .required('Повторіть пароль'),
    });
};
