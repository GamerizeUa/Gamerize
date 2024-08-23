export const getImagePath = (imagePath) => {
    if (!imagePath) return null;

    const regex = new RegExp(/\.\\wwwroot\\images/g);
    const formattedPath = imagePath.replaceAll(regex, '').replace(/\\/g, '/');

    return `https://gamerize.ltd.ua/images${formattedPath}`;
};
