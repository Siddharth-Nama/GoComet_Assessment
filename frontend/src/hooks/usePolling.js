import { useEffect, useRef } from 'react';

const usePolling = (callback, interval = 5000) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current) {
                savedCallback.current();
            }
        }

        if (interval !== null) {
            const id = setInterval(tick, interval);
            return () => clearInterval(id);
        }
    }, [interval]);
};

export default usePolling;
