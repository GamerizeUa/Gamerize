import * as yup from 'yup';

const requiredNumber = yup
    .number('Значення цього поля має бути числом')
    .positive('Значення цього поля має бути більшим за 0')
    .required('Це обов`язкове поле');

export const filterSchema = yup.object({
    minPrice: requiredNumber,
    maxPrice: requiredNumber,
});
