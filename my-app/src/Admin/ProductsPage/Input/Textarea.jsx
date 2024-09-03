import { useController } from 'react-hook-form';
import styles from '../assets/styles/input.module.css';

export const Textarea = ({
    name,
    placeholder = '',
    rows,
    cols,
    rules,
    control,
    label,
}) => {
    const {
        field,
        fieldState: { invalid, error },
    } = useController({ name, control, rules });

    return (
        <div className={styles['form-control']}>
            <label>
                {label}
                <textarea
                    {...field}
                    rows={rows}
                    cols={cols}
                    placeholder={placeholder}
                    aria-invalid={invalid}
                    className={styles['form-control__input']}
                />
            </label>
            {error && (
                <p className={styles['form-control__error']}>
                    {error?.message}
                </p>
            )}
        </div>
    );
};
