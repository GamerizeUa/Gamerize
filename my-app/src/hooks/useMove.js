export const useMove = ({
    slides,
    state,
    setState,
    galleryMove,
    images,
    mainPhotoWidthPercentage,
    rightEdgeMain,
    rightEdgeGallery,
}) => {
    const moveLeftGallery = (slidesToMove = 1) => {
        console.log(slides)
        console.log(state.currentGallerySlide - slidesToMove)

        if (slides <= state.currentGallerySlide - slidesToMove) {
            setState((prev) => ({
                ...prev,
                currentGallerySlide: prev.currentGallerySlide - slidesToMove,
                initPointGallery:
                    prev.initPointGallery + galleryMove * slidesToMove,
            }));
        } else {
            setState((prev) => ({ ...prev, initPointGallery: 0 }));
        }
    };

    const moveRightGallery = (slidesToMove = 1) => {
        if (images.length >= state.currentGallerySlide + slidesToMove) {
            setState((prev) => ({
                ...prev,
                currentGallerySlide: prev.currentGallerySlide + slidesToMove,
                initPointGallery:
                    prev.initPointGallery - galleryMove * slidesToMove,
            }));
        } else {
            setState((prev) => ({
                ...prev,
                initPointGallery: -(galleryMove * (images.length - slides)),
            }));
        }
    };

    const moveLeftMain = () => {
        if (state.initPointMain !== 0) {
            setState((prev) => ({
                ...prev,
                initPointMain: prev.initPointMain + mainPhotoWidthPercentage,
                currentSlide: prev.currentSlide - 1,
            }));
            state.currentSlide <= images.length - slides && moveLeftGallery(1);
        }
    };

    const moveRightMain = () => {
        if (state.initPointMain !== rightEdgeMain) {
            setState((prev) => ({
                ...prev,
                initPointMain: prev.initPointMain - mainPhotoWidthPercentage,
                currentSlide: prev.currentSlide + 1,
            }));
            state.currentSlide + 1 >= slides &&
                state.initPointGallery !== rightEdgeGallery &&
                moveRightGallery(1);
        }
    };
    return { moveRightGallery, moveLeftGallery, moveRightMain, moveLeftMain };
};
