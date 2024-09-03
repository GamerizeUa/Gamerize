import * as yup from 'yup';

const requiredString = yup
    .string('Значення цього поля має бути стрічкою')
    .required('Це обов`язкове поле');

const requiredNumber = yup
    .number('Значення цього поля має бути числом')
    .positive('Значення цього поля має бути більшим за 0')
    .required('Це обов`язкове поле');

const positiveNumber = yup
    .number('Значення цього поля має бути числом')
    .positive('Значення цього поля має бути більшим за 0');

const requiredArray = yup.array().required('Це обов`язкове поле');

export const scheme = yup.object({
    Name: requiredString,
    Price: requiredNumber,
    Description: requiredString,
    NewImages: requiredArray,
    MinPlayers: yup
        .number('Значення цього поля має бути числом')
        .min(
            1,
            'Значення цього поля має бути дорівнювати або бути більшим за 1'
        )
        .required('Це обов`язкове поле'),
    MaxPlayers: positiveNumber.required('Це обов`язкове поле'),
    MinAge: positiveNumber.required('Це обов`язкове поле'),
    MinGameTimeMinutes: yup
        .number('Значення цього поля має бути числом')
        .min(5, 'Значення цього поля має дорівнювати або бути більшим за 5')
        .max(240, 'Значення цього поля має дорівнювати або бути меньшим за 240')
        .positive('Значення цього поля має бути більшим за 0')
        .required('Це обов`язкове поле'),
    MaxGameTimeMinutes: yup
        .number('Значення цього поля має бути числом')
        .min(5, 'Значення цього поля має дорівнювати або бути більшим за 5')
        .max(240, 'Значення цього поля має дорівнювати або бути меньшим за 240')
        .positive('Значення цього поля має бути більшим за 0')
        .required('Це обов`язкове поле'),
    Language: requiredString,
    CategoryId: requiredNumber,
    ThemeId: requiredNumber,
    GenreId: requiredNumber,
    NewTags: yup.array(),
});
