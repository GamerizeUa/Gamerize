import { createContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';

export const FormContext = createContext(null);

export const Form = ({
    children,
    cb,
    className,
    defaultValues,
    contextProps,
    validationSchema,
}) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues,
    });

    return (
        <FormContext.Provider value={{ control, ...contextProps }}>
            <form className={className} onSubmit={handleSubmit(cb)}>
                {children}
                <DevTool control={control} />
            </form>
        </FormContext.Provider>
    );
};
