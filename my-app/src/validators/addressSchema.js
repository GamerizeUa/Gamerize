import * as yup from 'yup';

export const addressSchema = yup.object().shape({
    city: yup
        .string()
        .nullable()
        .matches(
            /^[A-Za-zА-Яа-яїЇ\s]+$/,
            'Введіть коректну назву населеного пункту'
        )
        .required('Введіть населений пункт'),
    address: yup
        .string()
        .nullable()
        .matches(/(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-яїЇ\d]/, {
            message: 'Адреса повинна мати назву вулиці та номер будинку',
            excludeEmptyString: true,
        })
        .required('Введіть адресу доставки'),
});
