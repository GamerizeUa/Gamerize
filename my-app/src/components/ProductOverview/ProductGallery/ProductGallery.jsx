import {
    useState,
    useEffect,
    useLayoutEffect,
    createContext,
    useContext,
} from 'react';
import styles from './ProductGallery.module.css';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs.jsx';
import { ActionsBar } from '../ActionsBar/ActionsBar.jsx';
import { useResizeObserver } from '@/hooks/useResizeObserver';
import { Slider } from './Slider.jsx';
import { SliderControl } from './SliderControl.jsx';
import { useMove } from '@/hooks/useMove';
import { ProductContext } from '@/pages/ProductPage/Product.jsx';
import { getImagePath } from '@/utils/getImagePath';

export const GalleryContext = createContext(null);

export const ProductGallery = ({ breadcrumbsDetails }) => {
    let { images } = useContext(ProductContext);

    images = images.map((image) => getImagePath(image.path));

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [state, setState] = useState({
        thumbsGap: 0,
        thumbsWidth: 0,
        mainPhotoWidth: 0,
        initPointGallery: 0,
        initPointMain: 0,
        initTouch: 0,
        currentGallerySlide: 4,
        currentSlide: 0,
    });
    const { thumbsRef, mainPhotoRef } = useResizeObserver(setState);

    const slides = 4;
    const mainPhotoWidthPercentage = 100;
    const thumbSize = (state.thumbsWidth - state.thumbsGap * 3) / 4;
    const galleryMove =
        ((thumbSize + state.thumbsGap) / state.thumbsWidth) * 100;
    const rightEdgeGallery = -(
        galleryMove * images.length -
        galleryMove * slides
    );
    const rightEdgeMain = -(mainPhotoWidthPercentage * (images.length - 1));

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        thumbsRef.current.style.transform = `translate(${state.initPointGallery}%)`;
    }, [state.initPointGallery, thumbsRef]);

    useLayoutEffect(() => {
        mainPhotoRef.current.style.transform = `translate(${state.initPointMain}%)`;
    }, [state.initPointMain, mainPhotoRef]);

    const { moveLeftGallery, moveRightGallery, moveLeftMain, moveRightMain } =
        useMove({
            slides,
            state,
            setState,
            galleryMove,
            images,
            mainPhotoWidthPercentage,
            rightEdgeMain,
            rightEdgeGallery,
        });

    const changeMainPhoto = (index) => {
        const slidesDiff = Math.abs(index - state.currentSlide);
        setState((prev) => ({
            ...prev,
            initPointMain:
                state.currentSlide < index
                    ? prev.initPointMain - mainPhotoWidthPercentage * slidesDiff
                    : prev.initPointMain +
                      mainPhotoWidthPercentage * slidesDiff,
            currentSlide: index,
        }));
    };

    return (
        <GalleryContext.Provider value={{ images, state, setState }}>
            <section className={styles['product-gallery']}>
                {windowWidth < 1280 && (
                    <Breadcrumbs page={breadcrumbsDetails} />
                )}
                <div className={styles['product-gallery__actions']}>
                    {windowWidth < 1280 && <ActionsBar />}
                </div>
                <div className={styles['product-gallery__container']}>
                    <Slider
                        ref={mainPhotoRef}
                        rightEdge={rightEdgeMain}
                        moveLeft={moveLeftMain}
                        moveRight={moveRightMain}
                    />
                </div>
                <SliderControl
                    ref={thumbsRef}
                    moveLeft={moveLeftGallery}
                    moveRight={moveRightGallery}
                    changeMainPhoto={changeMainPhoto}
                    rightEdge={rightEdgeGallery}
                    thumbSize={thumbSize}
                    currentSlide={state.currentSlide}
                />
            </section>
        </GalleryContext.Provider>
    );
};
