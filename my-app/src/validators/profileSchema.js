import * as yup from "yup";

export const profileSchema = yup.object().shape({
    name: yup.string().nullable().matches(
        /^[a-zA-Zа-яіА-ЯІїЇ'\-]+\s[a-zA-Zа-яіА-ЯІїЇ'\-]+$/i,
        "Введіть ім'я та прізвище"
    ),
    phoneNumber: yup.string().nullable()
        .matches(/(^$|\+380\d{9}$)/, 'Введіть коректний номер телефону (+380XXXXXXXXX)'),
    email: yup.string().nullable()
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, {
            message: '"Введіть коректну е-пошту"',
            excludeEmptyString: true,
        }),
    city: yup.string().nullable().matches(/^[А-яа-яїЇіІ]+$/i, {message: "Введіть місто кирилицею"}),
    deliveryAddress: yup.string().nullable()
        .matches(/(?=.*[A-Za-zА-Яа-яїЇіІ])(?=.*\d)[A-Za-zА-Яа-яїЇіІ\d]/, {
            message: 'Адреса повинна мати назву вулиці та номер будинку',
            excludeEmptyString: true,
        })
});