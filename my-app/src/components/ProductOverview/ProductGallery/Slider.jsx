import { forwardRef, useContext } from 'react';
import styles from './ProductGallery.module.css';
import { useTouchHandlers } from '@/hooks/useTouchHandlers.jsx';
import { GalleryContext } from './ProductGallery.jsx';

export const Slider = forwardRef(function Slider(
    { rightEdge, moveLeft, moveRight },
    ref
) {
    const { images, state, setState } = useContext(GalleryContext);
    const { handleStart, handleMove, handleEnd } = useTouchHandlers(
        { initPoint: state.initPointMain, initTouch: state.initTouch },
        setState,
        state.mainPhotoWidth,
        rightEdge,
        moveLeft,
        moveRight
    );

    return (
        <div
            className={styles['product-gallery__images']}
            ref={ref}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
        >
            {images.map((image, index) => (
                <div key={index}>
                    <img
                        src={image}
                        alt={`Main product image`}
                        className={styles['product-gallery__image']}
                    />
                </div>
            ))}
        </div>
    );
});
