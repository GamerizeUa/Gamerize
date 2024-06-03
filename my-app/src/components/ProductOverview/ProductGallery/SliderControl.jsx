import { forwardRef, useContext } from 'react';
import styles from './ProductGallery.module.css';
import ArrowGalleryIcon from '../icons/ArrowGalleryIcon.jsx';
import { useTouchHandlers } from '../../../hooks/useTouchHandlers.jsx';
import { GalleryContext } from './ProductGallery.jsx';

export const SliderControl = forwardRef(function SliderControl(
    {
        changeMainPhoto,
        rightEdge,
        thumbSize,
        currentSlide,
        moveLeft,
        moveRight,
    },
    ref
) {
    const { images, state, setState } = useContext(GalleryContext);

    const { handleStart, handleMove, handleEnd } = useTouchHandlers(
        { initPoint: state.initPointGallery, initTouch: state.initTouch },
        setState,
        state.thumbsWidth,
        rightEdge,
        moveLeft,
        moveRight
    );

    return (
        <div className={styles['product-gallery__control']}>
            <ArrowGalleryIcon
                classArrow={styles['product-gallery__arrow']}
                funcOnClick={() => moveLeft(1)}
            />
            <div className={styles['product-gallery__control-container']}>
                <div
                    className={styles['product-gallery__thumbnails']}
                    ref={ref}
                    onTouchStart={rightEdge <= 0 ? handleStart : undefined}
                    onTouchMove={rightEdge <= 0 ? handleMove : undefined}
                    onTouchEnd={rightEdge <= 0 ? handleEnd : undefined}
                >
                    {images.map((image, index) => (
                        <div key={index}>
                            <img
                                src={image}
                                alt={`Thumbnail ${index}`}
                                className={styles['product-gallery__thumbnail']}
                                style={{
                                    width: `${thumbSize}px`,
                                    height: `${thumbSize}px`,
                                    filter:
                                        index === currentSlide
                                            ? 'none'
                                            : 'grayscale(50%)',
                                    opacity:
                                        index === currentSlide ? '1' : '0.5',
                                }}
                                onClick={() => changeMainPhoto(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <ArrowGalleryIcon
                classArrow={styles['product-gallery__arrow']}
                funcOnClick={() => moveRight(1)}
                style={{ transform: 'rotate(180deg)' }}
            />
        </div>
    );
});
