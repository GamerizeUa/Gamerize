export const filterProducts = (products, filters) => {
    return products.filter(product => {
        if (filters.ages && filters.ages.length > 0) {
            const ageRange = product.minAge + ' - ' + (product.maxAge || '');
            if (!filters.ages.includes(ageRange)) {
                return false;
            }
        }

        if (filters.categories && filters.categories.length > 0) {
            if (!filters.categories.includes(product.category)) {
                return false;
            }
        }

        if (filters.gameTimes && filters.gameTimes.length > 0) {
            const productGameTime = product.gameTimeMinutes;
            if (!filters.gameTimes.some(timeRange => {
                const [minTime, maxTime] = timeRange.split(' - ').map(Number);
                return productGameTime >= minTime && productGameTime <= maxTime;
            })) {
                return false;
            }
        }

        if (filters.languages && filters.languages.length > 0) {
            if (!filters.languages.includes(product.language)) {
                return false;
            }
        }

        if (filters.price) {
            const productPrice = product.price;
            const minPrice = filters.price.min ? parseInt(filters.price.min, 10) : Number.MIN_SAFE_INTEGER;
            const maxPrice = filters.price.max ? parseInt(filters.price.max, 10) : Number.MAX_SAFE_INTEGER;

            if (productPrice < minPrice || productPrice > maxPrice) {
                return false;
            }
        }

        return true;
    });
};