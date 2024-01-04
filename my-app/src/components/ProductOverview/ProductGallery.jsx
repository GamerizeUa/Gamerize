import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from './ProductGallery.module.css';
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mainProductPhoto from '../../assets/images/mainProductPhoto.png'
import imageCompanyGame from "../../assets/images/selection_company.jpg";
import feedback from "../../assets/images/feedback.svg";
import product from "../../assets/images/product.png";
import box from "../../assets/images/presentBox.png";
import {Breadcrumbs} from "./Breadcrumbs.jsx";

export const ProductGallery = () => {
    const photoArray = [mainProductPhoto, imageCompanyGame, feedback, imageCompanyGame, product, box, feedback];
    const thumbnailsContainer = useRef(null);
    const mainPhotoContainer = useRef(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [thumbnailsContainerGap, setThumbnailsContainerGap] = useState(0);
    const [thumbnailsContainerWidth, setThumbnailsContainerWidth] = useState(0);
    const [mainPhotoContainerWidth, setMainPhotoContainerWidth] = useState(0);
    const [initialPointGallery, setInitialPointGallery] = useState(0);
    const [initialPointMainPhoto, setInitialPointMainPhoto] = useState(0);
    const [initialTouchPointGallery, setInitialTouchPointGallery] = useState(0);
    const [initialTouchPointMainPhoto, setInitialTouchPointMainPhoto] = useState(0);
    const [currentGallerySlide, setCurrentGallerySlide] = useState(4);
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = 4;
    const mainPhotoWidthPercentage = 100;
    const thumbnailWidthHeight = (thumbnailsContainerWidth - (thumbnailsContainerGap * 3)) / 4;
    const galleryMove = (thumbnailWidthHeight + thumbnailsContainerGap) / thumbnailsContainerWidth * 100;
    const rightEdgeGallery = -(galleryMove * photoArray.length - galleryMove * slides);
    const rightEdgeMainPhoto = -(mainPhotoWidthPercentage * (photoArray.length - 1));

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                if (entry.target === thumbnailsContainer.current) {
                    setThumbnailsContainerWidth(entry.contentRect.width);
                } else {
                    setMainPhotoContainerWidth(entry.contentRect.width);
                }
            });
            const divWidth = parseFloat(getComputedStyle(thumbnailsContainer.current).width);
            const divGap = parseFloat(getComputedStyle(thumbnailsContainer.current).gap);
            setThumbnailsContainerGap((divWidth * divGap) / 100);
        });
        observer.observe(thumbnailsContainer.current);
        observer.observe(mainPhotoContainer.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        thumbnailsContainer.current.style.transform = 'translate(' + initialPointGallery + '%)';
    }, [initialPointGallery]);

    useLayoutEffect(() => {
        mainPhotoContainer.current.style.transform = 'translate(' + initialPointMainPhoto + '%)';
    }, [initialPointMainPhoto]);

    const handleTouchStartMainPhoto = (e) => {
        setInitialTouchPointMainPhoto(e.touches[0].clientX);
    }

    const handleTouchMoveMainPhoto = (e) => {
        const touchDifference = initialTouchPointMainPhoto - e.touches[0].clientX;
        const translatePercentage = initialPointMainPhoto - (touchDifference / mainPhotoContainerWidth * 100);
        if (initialTouchPointMainPhoto < e.touches[0].clientX) {
            mainPhotoContainer.current.style.transform =
                `translate(${translatePercentage < 0 ? translatePercentage : 0}%)`;
        } else {
            mainPhotoContainer.current.style.transform =
                `translate(${translatePercentage > rightEdgeMainPhoto ? translatePercentage : rightEdgeMainPhoto}%)`;
        }
    }

    const handleTouchEndMainPhoto = (e) => {
        const touchDifference = initialTouchPointMainPhoto - e.changedTouches[0].clientX;
        touchDifference > 0 ? moveRightPhoto() : moveLeftMainPhoto();
    }

    const moveLeftMainPhoto = () => {
        if (initialPointMainPhoto !== 0) {
            setInitialPointMainPhoto(prevNumber => prevNumber + mainPhotoWidthPercentage);
            setCurrentSlide(prevNumber => prevNumber - 1);
            {
                currentSlide <= photoArray.length - slides ? moveLeftGallery(1) : '';
            }
        }
    }

    const moveRightPhoto = () => {
        if (initialPointMainPhoto !== rightEdgeMainPhoto) {
            setInitialPointMainPhoto(prevNumber => prevNumber - mainPhotoWidthPercentage);
            setCurrentSlide(prevNumber => prevNumber + 1);
            {
                currentSlide + 1 >= slides && initialPointGallery !== rightEdgeGallery
                    ? moveRightGallery(1)
                    : '';
            }
        }
    }


    const changeMainPhoto = (index) => {
        const slidesDifference = Math.abs(index - currentSlide);
        {
            currentSlide < index
                ? setInitialPointMainPhoto(prevNumber => prevNumber - mainPhotoWidthPercentage * slidesDifference)
                : setInitialPointMainPhoto(prevNumber => prevNumber + mainPhotoWidthPercentage * slidesDifference)
        }
        setCurrentSlide(index);
    }

    const handleTouchStartGallery = (e) => {
        setInitialTouchPointGallery(e.touches[0].clientX);
    }

    const handleTouchMoveGallery = (e) => {
        const touchDifference = initialTouchPointGallery - e.touches[0].clientX;
        const translatePercentage = initialPointGallery - (touchDifference / thumbnailsContainerWidth * 100);
        if (initialTouchPointGallery < e.touches[0].clientX) {
            thumbnailsContainer.current.style.transform =
                `translate(${translatePercentage < 0 ? translatePercentage : 0}%)`;
        } else {
            thumbnailsContainer.current.style.transform =
                `translate(${translatePercentage > rightEdgeGallery ? translatePercentage : rightEdgeGallery}%)`;
        }
    }

    const handleTouchEndGallery = (e) => {
        const touchDifference = initialTouchPointGallery - e.changedTouches[0].clientX;
        const slidesTouched = Math.abs(Math.round(touchDifference / thumbnailWidthHeight));
        if (slidesTouched === 0) {
            thumbnailsContainer.current.style.transform = 'translate(' + initialPointGallery + '%)';
        } else {
            touchDifference > 0 && slidesTouched >= 1 ? moveRightGallery(slidesTouched) : moveLeftGallery(slidesTouched);
        }
    }

    const moveLeftGallery = (slidesToMove = 1) => {
        if (slides <= (currentGallerySlide - slidesToMove)) {
            setCurrentGallerySlide(currentGallerySlide - slidesToMove);
            setInitialPointGallery(prevNumber => prevNumber + (galleryMove * slidesToMove));
        } else {
            setInitialPointGallery(0);
        }
    }

    const moveRightGallery = (slidesToMove = 1) => {
        if (photoArray.length >= currentGallerySlide + slidesToMove) {
            setCurrentGallerySlide(currentGallerySlide + slidesToMove);
            setInitialPointGallery(prevNumber => prevNumber - (galleryMove * slidesToMove));
        } else {
            setInitialPointGallery(-(galleryMove * (photoArray.length - slides)))
        }
    }

    return (
        <div className={styles.productGallery}>
            {windowWidth < 1280 && <Breadcrumbs/>}
            <div className={styles.productGallery_mainImageContainer}>
                <div className={styles.productGallery_mainImagesList}
                     ref={mainPhotoContainer}
                     onTouchStart={handleTouchStartMainPhoto}
                     onTouchMove={handleTouchMoveMainPhoto}
                     onTouchEnd={handleTouchEndMainPhoto}
                >
                    {photoArray.map((image, index) => (
                        <div key={index}>
                            <img
                                src={image}
                                alt={`MainProductImage`}
                                className={styles.productGallery_mainImage}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.productGallery_gallery}>
                <FontAwesomeIcon icon={faChevronLeft} className={styles.productGallery_arrow}
                                 onClick={moveLeftGallery}/>
                <div className={styles.productGallery_thumbnailsContainer}>
                    <div className={styles.productGallery_thumbnailsList}
                         ref={thumbnailsContainer}
                         onTouchStart={rightEdgeGallery <= 0 ? handleTouchStartGallery : undefined}
                         onTouchMove={rightEdgeGallery <= 0 ? handleTouchMoveGallery : undefined}
                         onTouchEnd={rightEdgeGallery <= 0 ? handleTouchEndGallery : undefined}
                    >
                        {photoArray.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className={styles.productGallery_thumbnail}
                                    style={{
                                        width: `${thumbnailWidthHeight}px`, height: `${thumbnailWidthHeight}px`,
                                        filter: index === currentSlide ? 'none' : 'grayscale(50%)',
                                        opacity: index === currentSlide ? '1' : '0.5'
                                    }}
                                    onClick={() => changeMainPhoto(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className={styles.productGallery_arrow}
                                 onClick={moveRightGallery}/>
            </div>
        </div>
    )
}