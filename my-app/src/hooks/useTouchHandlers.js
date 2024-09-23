export const useTouchHandlers = (
    initPoints,
    setInitPoints,
    containerWidth,
    rightEdge,
    moveLeft,
    moveRight
) => {
    const handleStart = (e) => {
        setInitPoints((prev) => ({ ...prev, initTouch: e.touches[0].clientX }));
    };

    const handleMove = (e) => {
        const touchDiff = initPoints.initTouch - e.touches[0].clientX;
        const translatePercent =
            initPoints.initPoint - (touchDiff / containerWidth) * 100;
        e.currentTarget.style.transform = `translate(${Math.min(
            0,
            Math.max(translatePercent, rightEdge)
        )}%)`;
    };

    const handleEnd = (e) => {
        const touchDiff = initPoints.initTouch - e.changedTouches[0].clientX;
        touchDiff > 0 ? moveRight() : moveLeft();
    };

    return { handleStart, handleMove, handleEnd };
};
