export const calculateTotalDiscount = (price, discounts) => {
    if (!discounts || discounts.length === 0) return price;
    let priceWithDiscount = price;

    for (let discount of discounts) {
        priceWithDiscount -= price * discount.currentDiscount;
    }

    return Math.round(priceWithDiscount);
};
