import { useState, useEffect } from 'react';
import { useController } from 'react-hook-form';
import styles from '../assets/styles/input.module.css';

export const ImagePicker = ({ control, name, rules, children }) => {
    const {
        field,
        fieldState: { invalid },
    } = useController({ control, name, rules });

    const [gallery, setGallery] = useState([]);
    const [pickerValue, setPickerValue] = useState('');

    const handleImageUpload = ({ target: { files } }) => {
        setPickerValue(files);

        const fileReader = new FileReader();

        fileReader.onload = ({ target: { result } }) => {
            const newGallery = [...gallery, result];
            setGallery(newGallery);
            field.onChange(newGallery);
        };

        if (files.length === 0) return;

        for (let file of files) {
            fileReader.readAsDataURL(file);
        }
    };

    const handleImageRemove = (index) => {
        const newGallery = gallery.filter((image, id) => index !== id);
        setGallery(newGallery);
        field.onChange(newGallery);
    };

    useEffect(() => {
        return () => {
            setGallery([]);
            setPickerValue('');
        };
    }, []);

    return (
        <div className={styles['image-picker']}>
            <div className={styles['image-picker__container']}>
                <input
                    type="file"
                    accept="image/*"
                    defaultValue={pickerValue}
                    onChange={handleImageUpload}
                    onBlur={field.onBlur}
                    aria-invalid={invalid}
                    className={styles['image-picker__input']}
                />
                <div className={styles['image-picker__placeholder']}>
                    {children}
                </div>
            </div>
            {gallery.length > 0 && (
                <div className={styles['image-picker__gallery']}>
                    {gallery.map((image, index) => (
                        <img
                            src={image}
                            alt=""
                            className={styles['image-picker__item']}
                            key={index}
                            onClick={() => handleImageRemove(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
