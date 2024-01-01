const ArrowLeftIcon = ({color = "#AAC4FF", strokeWidth = "2"}) => {
    return ( 
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path d="M31.25 37.5L18.75 25L31.25 12.5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}
export default ArrowLeftIcon;