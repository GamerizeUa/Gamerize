import { useEffect, useRef } from 'react';

export const useResizeObserver = (setDimensions) => {
    const thumbsRef = useRef(null);
    const mainPhotoRef = useRef(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.target === thumbsRef.current) {
                    const { width } = entry.contentRect;
                    const gap = parseFloat(
                        getComputedStyle(thumbsRef.current).gap
                    );
                    setDimensions((prev) => ({
                        ...prev,
                        thumbsWidth: width,
                        thumbsGap: (width * gap) / 100,
                    }));
                } else {
                    setDimensions((prev) => ({
                        ...prev,
                        mainPhotoWidth: entry.contentRect.width,
                    }));
                }
            });
        });

        observer.observe(thumbsRef.current);
        observer.observe(mainPhotoRef.current);

        return () => observer.disconnect();
    }, [setDimensions]);

    return { thumbsRef, mainPhotoRef };
};
