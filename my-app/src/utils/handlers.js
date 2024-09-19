export const handleOverlayClick = ({ currentTarget, target }, cb) => {
    if (currentTarget === target) {
        cb();
    }
};
