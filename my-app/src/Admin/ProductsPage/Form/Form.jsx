import { createContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { General } from './General';
import { Organization } from './Organization';
import { scheme } from './validationScheme';

import { cn } from '../../../utils/classnames';
import buttons from '../assets/styles/buttons.module.css';

export const FormContext = createContext(null);

export const Form = ({
    children,
    cb,
    genres,
    themes,
    categories,
    languages,
    className,
    defaultValues,
}) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(scheme),
        defaultValues,
    });

    return (
        <FormContext.Provider
            value={{ control, genres, themes, categories, languages }}
        >
            <form className={className} onSubmit={handleSubmit(cb)}>
                {children}
                <button
                    type="submit"
                    className={cn(buttons['btn'], buttons['btn--primary'])}
                >
                    Зберегти
                </button>
            </form>
        </FormContext.Provider>
    );
};

Form.General = General;
Form.Organization = Organization;
