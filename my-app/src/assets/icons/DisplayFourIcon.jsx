import styles from '@/pages/Catalog/CatalogSorting/CatalogSorting.module.css';

export const DisplayFourIcon = ({ isActive, setIsActive }) => {
    const handleIconClick = () => {
        setIsActive({ displayingThree: false, displayingFour: true });
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            className={isActive ? styles.active : ''}
            onClick={handleIconClick}
        >
            <path
                d="M6.875 25C6.35417 25 5.91146 24.8177 5.54688 24.4531C5.18229 24.0885 5 23.6458 5 23.125C5 22.6042
                5.18229 22.1615 5.54688 21.7969C5.91146 21.4323 6.35417 21.25 6.875 21.25C7.39583 21.25 7.83854 21.4323
                8.20312 21.7969C8.56771 22.1615 8.75 22.6042 8.75 23.125C8.75 23.6458 8.56771 24.0885 8.20312
                24.4531C7.83854 24.8177 7.39583 25 6.875 25ZM12.2812 25C11.7604 25 11.3177 24.8177 10.9531
                24.4531C10.5885 24.0885 10.4062 23.6458 10.4062 23.125C10.4062 22.6042 10.5885 22.1615 10.9531
                21.7969C11.3177 21.4323 11.7604 21.25 12.2812 21.25C12.8021 21.25 13.2448 21.4323 13.6094 21.7969C13.974
                22.1615 14.1562 22.6042 14.1562 23.125C14.1562 23.6458 13.974 24.0885 13.6094 24.4531C13.2448 24.8177
                12.8021 25 12.2812 25ZM17.7188 25C17.1979 25 16.7552 24.8177 16.3906 24.4531C16.026 24.0885 15.8438
                23.6458 15.8438 23.125C15.8438 22.6042 16.026 22.1615 16.3906 21.7969C16.7552 21.4323 17.1979 21.25
                17.7188 21.25C18.2396 21.25 18.6823 21.4323 19.0469 21.7969C19.4115 22.1615 19.5938 22.6042 19.5938
                23.125C19.5938 23.6458 19.4115 24.0885 19.0469 24.4531C18.6823 24.8177 18.2396 25 17.7188 25ZM23.125
                25C22.6042 25 22.1615 24.8177 21.7969 24.4531C21.4323 24.0885 21.25 23.6458 21.25 23.125C21.25 22.6042
                21.4323 22.1615 21.7969 21.7969C22.1615 21.4323 22.6042 21.25 23.125 21.25C23.6458 21.25 24.0885 21.4323
                24.4531 21.7969C24.8177 22.1615 25 22.6042 25 23.125C25 23.6458 24.8177 24.0885 24.4531 24.4531C24.0885
                24.8177 23.6458 25 23.125 25ZM6.875 19.5938C6.35417 19.5938 5.91146 19.4115 5.54688 19.0469C5.18229
                18.6823 5 18.2396 5 17.7188C5 17.1979 5.18229 16.7552 5.54688 16.3906C5.91146 16.026 6.35417 15.8438
                6.875 15.8438C7.39583 15.8438 7.83854 16.026 8.20312 16.3906C8.56771 16.7552 8.75 17.1979 8.75
                17.7188C8.75 18.2396 8.56771 18.6823 8.20312 19.0469C7.83854 19.4115 7.39583 19.5938 6.875
                19.5938ZM12.2812 19.5938C11.7604 19.5938 11.3177 19.4115 10.9531 19.0469C10.5885 18.6823 10.4062 18.2396
                10.4062 17.7188C10.4062 17.1979 10.5885 16.7552 10.9531 16.3906C11.3177 16.026 11.7604 15.8438 12.2812
                15.8438C12.8021 15.8438 13.2448 16.026 13.6094 16.3906C13.974 16.7552 14.1562 17.1979 14.1562
                17.7188C14.1562 18.2396 13.974 18.6823 13.6094 19.0469C13.2448 19.4115 12.8021 19.5938 12.2812
                19.5938ZM17.7188 19.5938C17.1979 19.5938 16.7552 19.4115 16.3906 19.0469C16.026 18.6823 15.8438 18.2396
                15.8438 17.7188C15.8438 17.1979 16.026 16.7552 16.3906 16.3906C16.7552 16.026 17.1979 15.8438 17.7188
                15.8438C18.2396 15.8438 18.6823 16.026 19.0469 16.3906C19.4115 16.7552 19.5938 17.1979 19.5938
                17.7188C19.5938 18.2396 19.4115 18.6823 19.0469 19.0469C18.6823 19.4115 18.2396 19.5938 17.7188
                19.5938ZM23.125 19.5938C22.6042 19.5938 22.1615 19.4115 21.7969 19.0469C21.4323 18.6823 21.25 18.2396
                21.25 17.7188C21.25 17.1979 21.4323 16.7552 21.7969 16.3906C22.1615 16.026 22.6042 15.8438 23.125
                15.8438C23.6458 15.8438 24.0885 16.026 24.4531 16.3906C24.8177 16.7552 25 17.1979 25 17.7188C25
                18.2396 24.8177 18.6823 24.4531 19.0469C24.0885 19.4115 23.6458 19.5938 23.125 19.5938ZM6.875
                14.1562C6.35417 14.1562 5.91146 13.974 5.54688 13.6094C5.18229 13.2448 5 12.8021 5 12.2812C5 11.7604
                5.18229 11.3177 5.54688 10.9531C5.91146 10.5885 6.35417 10.4062 6.875 10.4062C7.39583 10.4062 7.83854
                10.5885 8.20312 10.9531C8.56771 11.3177 8.75 11.7604 8.75 12.2812C8.75 12.8021 8.56771 13.2448 8.20312
                13.6094C7.83854 13.974 7.39583 14.1562 6.875 14.1562ZM12.2812 14.1562C11.7604 14.1562 11.3177 13.974
                10.9531 13.6094C10.5885 13.2448 10.4062 12.8021 10.4062 12.2812C10.4062 11.7604 10.5885 11.3177 10.9531
                10.9531C11.3177 10.5885 11.7604 10.4062 12.2812 10.4062C12.8021 10.4062 13.2448 10.5885 13.6094
                10.9531C13.974 11.3177 14.1562 11.7604 14.1562 12.2812C14.1562 12.8021 13.974 13.2448 13.6094
                13.6094C13.2448 13.974 12.8021 14.1562 12.2812 14.1562ZM17.7188 14.1562C17.1979 14.1562 16.7552 13.974
                16.3906 13.6094C16.026 13.2448 15.8438 12.8021 15.8438 12.2812C15.8438 11.7604 16.026 11.3177 16.3906
                10.9531C16.7552 10.5885 17.1979 10.4062 17.7188 10.4062C18.2396 10.4062 18.6823 10.5885 19.0469
                10.9531C19.4115 11.3177 19.5938 11.7604 19.5938 12.2812C19.5938 12.8021 19.4115 13.2448 19.0469
                13.6094C18.6823 13.974 18.2396 14.1562 17.7188 14.1562ZM23.125 14.1562C22.6042 14.1562 22.1615 13.974
                21.7969 13.6094C21.4323 13.2448 21.25 12.8021 21.25 12.2812C21.25 11.7604 21.4323 11.3177 21.7969
                10.9531C22.1615 10.5885 22.6042 10.4062 23.125 10.4062C23.6458 10.4062 24.0885 10.5885 24.4531
                10.9531C24.8177 11.3177 25 11.7604 25 12.2812C25 12.8021 24.8177 13.2448 24.4531 13.6094C24.0885 13.974
                23.6458 14.1562 23.125 14.1562ZM6.875 8.75C6.35417 8.75 5.91146 8.56771 5.54688 8.20312C5.18229 7.83854
                5 7.39583 5 6.875C5 6.35417 5.18229 5.91146 5.54688 5.54688C5.91146 5.18229 6.35417 5 6.875 5C7.39583
                5 7.83854 5.18229 8.20312 5.54688C8.56771 5.91146 8.75 6.35417 8.75 6.875C8.75 7.39583 8.56771 7.83854
                8.20312 8.20312C7.83854 8.56771 7.39583 8.75 6.875 8.75ZM12.2812 8.75C11.7604 8.75 11.3177 8.56771
                10.9531 8.20312C10.5885 7.83854 10.4062 7.39583 10.4062 6.875C10.4062 6.35417 10.5885 5.91146 10.9531
                5.54688C11.3177 5.18229 11.7604 5 12.2812 5C12.8021 5 13.2448 5.18229 13.6094 5.54688C13.974 5.91146
                14.1562 6.35417 14.1562 6.875C14.1562 7.39583 13.974 7.83854 13.6094 8.20312C13.2448 8.56771 12.8021
                8.75 12.2812 8.75ZM17.7188 8.75C17.1979 8.75 16.7552 8.56771 16.3906 8.20312C16.026 7.83854 15.8438
                7.39583 15.8438 6.875C15.8438 6.35417 16.026 5.91146 16.3906 5.54688C16.7552 5.18229 17.1979 5 17.7188
                5C18.2396 5 18.6823 5.18229 19.0469 5.54688C19.4115 5.91146 19.5938 6.35417 19.5938 6.875C19.5938
                7.39583 19.4115 7.83854 19.0469 8.20312C18.6823 8.56771 18.2396 8.75 17.7188 8.75ZM23.125 8.75C22.6042
                8.75 22.1615 8.56771 21.7969 8.20312C21.4323 7.83854 21.25 7.39583 21.25 6.875C21.25 6.35417 21.4323
                5.91146 21.7969 5.54688C22.1615 5.18229 22.6042 5 23.125 5C23.6458 5 24.0885 5.18229 24.4531
                5.54688C24.8177 5.91146 25 6.35417 25 6.875C25 7.39583 24.8177 7.83854 24.4531 8.20312C24.0885 8.56771
                23.6458 8.75 23.125 8.75Z"
                fill="black"
            />
        </svg>
    );
};
