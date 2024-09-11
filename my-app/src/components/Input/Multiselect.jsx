import { useState, useEffect, useRef } from 'react';
import { useController } from 'react-hook-form';
import core from './input.module.css';
import custom from './multiselect.module.css';

export const Multiselect = ({ control, name, options, label, placeholder }) => {
    const { field } = useController({ name, control });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    const handleOptionChange = (value) => {
        field.onChange(
            field.value
                ? field.value.includes(value)
                    ? field.value.filter((item) => item !== value)
                    : [...field.value, value]
                : [value]
        );
    };

    const handleClickOutside = (e) => {
        if (!dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedLabels = options
        .filter((option) => field.value?.includes(option.value))
        .map((option) => option.label);

    return (
        <div className={core['form-control']} ref={dropdownRef}>
            <label htmlFor={name} className={core['form-control__label']}>
                {label}
            </label>
            <div className={custom['dropdown']} onClick={toggleDropdown}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={selectedLabels.join(', ')}
                    readOnly
                    className={core['form-control__input']}
                    id={name}
                />

                <div
                    className={custom['dropdown__menu']}
                    aria-expanded={isDropdownOpen}
                >
                    {options.map(({ value, label }) => (
                        <label key={value}>
                            <input
                                type="checkbox"
                                value={value}
                                onChange={() => handleOptionChange(value)}
                                checked={field.value?.includes(value)}
                                className={custom['dropdown__option']}
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};
