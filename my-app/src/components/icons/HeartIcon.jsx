const HeartIcon = ({ strokeColor = "#FEFEFE", fill = "none" }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.9909 6.84775C13.3251 3.7312 8.87968 2.89286 5.53961 5.74668C2.19955 8.60051 1.72931 13.372 4.35228 16.7472C6.53311 19.5535 13.1331 25.4721 15.2962 27.3878C15.5382 27.6021 15.6592 27.7093 15.8003 27.7514C15.9235 27.7881 16.0583 27.7881 16.1815 27.7514C16.3226 27.7093 16.4436 27.6021 16.6856 27.3878C18.8487 25.4721 25.4487 19.5535 27.6295 16.7472C30.2525 13.372 29.8396 8.57049 26.4422 5.74668C23.0447 2.92288 18.6567 3.7312 15.9909 6.84775Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HeartIcon;
