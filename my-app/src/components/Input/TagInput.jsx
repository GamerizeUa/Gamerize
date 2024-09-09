import { useState } from 'react';
import { useController } from 'react-hook-form';
import styles from './input.module.css';

export const TagInput = ({ name, rules, control, label, placeholder = '' }) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const {
        field: { onChange },
        fieldState: { invalid, error },
    } = useController({ name, control, rules });

    const handleKeyDown = (e) => {
        const { key } = e;

        if (key === ' ') {
            e.preventDefault();
            addTag();
        } else if (key === 'Backspace' && !inputValue) {
            e.preventDefault();
            removeLastTag();
        }
    };

    const addTag = () => {
        const trimmedInput = inputValue.trim();

        if (!trimmedInput || tags.includes(trimmedInput)) return;
        const newTags = [...tags, trimmedInput];
        setTags(newTags);
        onChange(newTags);
        setInputValue('');
    };

    const removeLastTag = () => {
        const newTags = tags.slice(0, -1);
        setTags(newTags);
        onChange(newTags);
    };

    return (
        <div className={styles['form-control']}>
            <label htmlFor={name}>{label}</label>
            <div className={styles['tag-input']}>
                <div className={styles['tag-input__list']}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles['tag-input__tag']}>
                            # {tag}
                        </span>
                    ))}
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        aria-invalid={invalid}
                        className={styles['tag-input__input']}
                        id={name}
                    />
                </div>
            </div>
            {error && (
                <p className={styles['form-control__error']}>{error.message}</p>
            )}
        </div>
    );
};
