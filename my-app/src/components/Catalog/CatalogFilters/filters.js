export const filterProducts = (products, filters) => {
    return products.filter(product => {
        if (filters.categories && filters.categories.length > 0) {
            if (!filters.categories.includes(product.category)) {
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

        if (filters.ages && filters.ages.length > 0) {
            const agesWithoutSpaces = filters.ages.map(age => age.replace(/\s/g, ''));
            if (!agesWithoutSpaces.includes(product.minAge)) {
                return false;
            }
        }

        if (filters.gameTimes && filters.gameTimes.length > 0) {
            const gameTimesWithoutSpaces = filters.gameTimes.map(gameTime => gameTime.replace(/\s/g, ''));
            if (!gameTimesWithoutSpaces.includes(product.gameTimeMinutes)) {
                return false;
            }
        }

        if (filters.languages && filters.languages.length > 0) {
            if (!filters.languages.includes(product.language)) {
                return false;
            }
        }

        if (filters.playersAmount && filters.playersAmount.length > 0) {
            if (!filters.playersAmount.includes(product.playersAmount)) {
                return false;
            }
        }

        return true;
    });
};