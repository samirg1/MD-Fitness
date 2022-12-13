/**
 * Keyboard shortcut creator.
 * @returns A useEffect function that can be used to customise keyboard shortcuts on pages.
 */
const useKeyDownHandler = () => {
    /**
     * Create a keyboard shortcut.
     * @param key The key to trigger the shortcut.
     * @param callback The function to call when the shortcut is triggered.
     * @returns Cleanup function that can be used by useEffect.
     */
    const keyboardShortcut = (key: string, callback: () => void) => {
        const keyDownHandler = (event: any) => {
            if (event.key === key) {
                event.preventDefault();
                callback();
            }
        };
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    };

    return keyboardShortcut;
};

export default useKeyDownHandler;
