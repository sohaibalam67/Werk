import { useEffect, useRef } from "preact/hooks";

function useInterval(callback: () => void, delay: number | null): void {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick(): void {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return (): void => {
                id && clearInterval(id);
            };
        }
    }, [delay]);
}

export default useInterval;
