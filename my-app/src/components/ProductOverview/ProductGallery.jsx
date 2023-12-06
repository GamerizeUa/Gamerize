import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from './ProductGallery.module.css';
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import mainProductPhoto from '../../assets/images/mainProductPhoto.png'
import imageCompanyGame from "../../assets/images/selection_company.jpg";
import feedback from "../../assets/images/feedback.svg";
import product from "../../assets/images/product.png";
import box from "../../assets/images/presentBox.png";

export const ProductGallery = () => {
    const photoArray = [mainProductPhoto, imageCompanyGame, imageCompanyGame, feedback, product, box];
    const thumbnailsContainer = useRef(null);
    const mainPhoto = useRef(null);
    const [thumbnailsContainerGap, setThumbnailsContainerGap] = useState(0);
    const [thumbnailsContainerWidth, setThumbnailsContainerWidth] = useState(0);
    const [initialPoint, setInitialPoint] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(4);
    const desktopSlides = 4;
    const imageWidthHeight = (thumbnailsContainerWidth - (thumbnailsContainerGap * 3)) / 4;
    const galleryMove = (imageWidthHeight + thumbnailsContainerGap) / thumbnailsContainerWidth * 100;

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setThumbnailsContainerWidth(entry.contentRect.width);
            });
            const divWidth = parseFloat(getComputedStyle(thumbnailsContainer.current).width);
            const divGap = parseFloat(getComputedStyle(thumbnailsContainer.current).gap);
            setThumbnailsContainerGap((divWidth * divGap) / 100);
        });
        observer.observe(thumbnailsContainer.current);
        return () => {
            observer.disconnect();
        };
    }, []);

    useLayoutEffect(() => {
        thumbnailsContainer.current.style.transform = 'translate(' + initialPoint + '%)';
    }, [initialPoint]);

    const changeMainPhoto = (newPhoto) => {
        mainPhoto.current.src = newPhoto;
    }

    const moveLeft = () => {
        if (desktopSlides <= currentSlide - 1) {
            setCurrentSlide(currentSlide - 1)
            setInitialPoint(prevNumber => prevNumber + galleryMove);
        }
    }

    const moveRight = () => {
        if (photoArray.length >= currentSlide + 1) {
            setCurrentSlide(currentSlide + 1)
            setInitialPoint(prevNumber => prevNumber - galleryMove);
        }
    }

    return (
        <div className={styles.productGallery}>
            <div className={styles.productGallery_mainImageContainer}>
                <img src={photoArray[0]} className={styles.productGallery_mainImage} alt="MainProductImage"
                     ref={mainPhoto}/>
            </div>
            <div className={styles.productGallery_gallery}>
                <FontAwesomeIcon icon={faChevronLeft} className={styles.productGallery_arrow} onClick={moveLeft}/>
                <div className={styles.productGallery_thumbnailsContainer}>
                    <div className={styles.productGallery_thumbnailsList} ref={thumbnailsContainer}>
                        {photoArray.map((image, index) => (
                            <div key={index}>
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className={styles.productGallery_thumbnail}
                                    style={{width: `${imageWidthHeight}px`, height: `${imageWidthHeight}px`}}
                                    onClick={() => changeMainPhoto(image)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className={styles.productGallery_arrow} onClick={moveRight}/>
            </div>
        </div>
    )
}