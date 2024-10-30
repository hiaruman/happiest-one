import { useState, useEffect } from 'react';

const useViewport = () => {
    const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Update viewport size when the window is resized
        const updateSize = () => {
            setViewportSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Set initial size
        updateSize();

        // Add resize event listener
        window.addEventListener('resize', updateSize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return viewportSize;
};

export default useViewport;
