import * as yup from "yup";

export const profileSchema = yup.object().shape({
    name: yup.string().nullable(),
    phoneNumber: yup.string().nullable()
        .matches(/(^$|\+380\d{9}$)/, 'Введіть коректний номер телефону (+380XXXXXXXXX)'),
    email: yup.string().nullable()
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]+$/i, {
            message: '"Введіть коректну е-пошту"',
            excludeEmptyString: true,
        }),
    city: yup.string().nullable().matches(/^[А-яа-я]+$/i, {message: "Введіть місто кирилицею"}),
    deliveryAddress: yup.string().nullable()
        .matches(/(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d]/, {
            message: 'Адреса повинна мати назву вулиці та номер будинку',
            excludeEmptyString: true,
        })
});