const useKeyDownHandler = () => {
    return (key: string, callback: () => void) => {
        const keyDownHandler = (event: any) => {
            if (event.key === key) {
                event.preventDefault();
                callback();
            }
        }
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    };
};

export default useKeyDownHandler;