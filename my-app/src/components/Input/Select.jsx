import { useController } from 'react-hook-form';
import styles from './input.module.css';

const SelectOption = ({ value, name }) => {
    return <option value={value}>{name}</option>;
};

export const Select = ({ name, options, rules, control, label }) => {
    const {
        field,
        fieldState: { invalid, error },
    } = useController({ name, control, rules });

    return (
        <div className={styles['form-control']}>
            <label htmlFor={name}>{label}</label>
            <select
                {...field}
                aria-invalid={invalid}
                className={styles['form-control__input']}
                id={name}
            >
                {options?.map((option) => (
                    <SelectOption
                        value={option.value}
                        name={option.name}
                        key={option.value}
                    />
                ))}
            </select>
            {error && (
                <p className={styles['form-control__error']}>{error.message}</p>
            )}
        </div>
    );
};
