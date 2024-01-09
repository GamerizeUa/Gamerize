import React from 'react';
const ArrowIconGallery = ({classArrow, funcOnClick, style}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={classArrow}
            onClick={funcOnClick}
            style={style}
            fill="none">
            <path d="M15.75 4.5L8.25 12L15.75 19.5"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export default ArrowIconGallery;