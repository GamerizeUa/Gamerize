const ArrowRightIcon = ({color = "#AAC4FF", width = "2"}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path d="M18.75 37.5L31.25 25L18.75 12.5" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default ArrowRightIcon;