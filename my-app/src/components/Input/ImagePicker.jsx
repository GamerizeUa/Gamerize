import { useState, useEffect } from 'react';
import { useController } from 'react-hook-form';
import styles from './image-picker.module.css';
import CrossIcon from '../icons/CrossIcon';

export const ImagePicker = ({ control, name, rules, children }) => {
    const {
        field,
        fieldState: { invalid },
    } = useController({ control, name, rules });

    const [gallery, setGallery] = useState([]);

    const handleImageUpload = ({ target: { files } }) => {
        if (!files.length) return;
        const newFiles = Array.from(files);

        const newImages = newFiles.map((file) => URL.createObjectURL(file));

        field.onChange(newFiles);
        setGallery(newImages);
    };

    const handleImageRemove = (index) => {
        const updatedUrls = field.value.filter((_, id) => id !== index);
        const updatedGallery = gallery.filter((_, id) => id !== index);
        URL.revokeObjectURL(field.value[index]);

        field.onChange(updatedUrls);

        setGallery(updatedGallery);
    };

    useEffect(() => {
        return () => {
            if (field.value) {
                Object.values(field.value).forEach((url) =>
                    URL.revokeObjectURL(url)
                );
            }
        };
    }, [field.value]);

    return (
        <div className={styles['image-picker']}>
            <div className={styles['image-picker__container']}>
                <input
                    type="file"
                    accept="image/*"
                    multiple
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
                    {gallery.map((url, index) => (
                        <div
                            className={styles['image-picker__item']}
                            key={index}
                        >
                            <img
                                src={url}
                                alt={`Preview ${index}`}
                                className={styles['image-picker__image']}
                            />
                            <button
                                onClick={() => handleImageRemove(index)}
                                className={styles['image-picker__btn']}
                            >
                                <CrossIcon />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
