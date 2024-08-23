import { Helmet } from 'react-helmet';
import { getImagePath } from '../../utils/getImagePath.js';

export const MetaTags = ({ product }) => {
    if (!product) return null;

    const { name, description, images } = product;

    return (
        <Helmet>
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={name} />
            <meta
                property="og:description"
                content={description.substr(0, 100) + '...'}
            />
            <meta property="og:image" content={getImagePath(images[0].path)} />
        </Helmet>
    );
};
