import sprite from '@/assets/icons/sprite.svg';

export const ChevronDown = ({ className }) => {
    return (
        <svg className={className}>
            <use
                href={sprite + '#icon-chevron-up'}
                fill="#EEF1FF"
                stroke="currentColor"
            ></use>
        </svg>
    );
};

export const ChevronUp = ({ className }) => {
    return (
        <svg className={className}>
            <use
                href={sprite + '#icon-chevron-down'}
                fill="#EEF1FF"
                stroke="currentColor"
            ></use>
        </svg>
    );
};
