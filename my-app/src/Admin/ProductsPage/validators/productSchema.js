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

export const productSchema = yup.object({
    Name: requiredString,
    Price: requiredNumber,
    Description: requiredString,
    NewImages: yup.array(),
    MinPlayers: yup
        .number('Значення цього поля має бути числом')
        .min(
            1,
            'Значення цього поля має бути дорівнювати або бути більшим за 1'
        )
        .required('Це обов`язкове поле'),
    MaxPlayers: positiveNumber,
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
    LanguageId: positiveNumber,
    CategoryId: positiveNumber,
    ThemeId: positiveNumber,
    GenreId: positiveNumber,
    NewTags: yup.array(),
});
