import { useController } from 'react-hook-form';
import styles from '../assets/styles/input.module.css';

export const Input = ({
    type,
    name,
    placeholder = ' ',
    rules,
    control,
    label,
}) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, error },
    } = useController({ name, control, rules });

    const processNumber = ({ target: { value } }) => {
        const newValue = parseInt(value);

        if (isNaN(newValue)) return onChange(0);

        return onChange(newValue);
    };

    return (
        <div className={styles['form-control']}>
            {label && (
                <label htmlFor={name} className={styles['form-control__label']}>
                    {label}
                </label>
            )}
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                aria-invalid={invalid}
                onChange={type === 'number' ? processNumber : onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
                className={styles['form-control__input']}
            />
            {error && (
                <p className={styles['form-control__error']}>{error.message}</p>
            )}
        </div>
    );
};
