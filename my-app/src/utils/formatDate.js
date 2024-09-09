export const formatDate = (date) => {
    const today = new Date();
    const isToday = date?.toDateString() === today.toDateString();
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    const hours = date?.getHours().toString().padStart(2, '0');
    const minutes = date?.getMinutes().toString().padStart(2, '0');

    if (isToday) {
        return `${hours}:${minutes}`;
    } else {
        return date?.toLocaleDateString('en-GB', options) ;
    }
};