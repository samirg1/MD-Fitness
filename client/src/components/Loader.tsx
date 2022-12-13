import "./Loader.css";

/**
 * Loader animation to display on all screens during a loading event.
 * @param isLoading Whether or not this component will display.
 */
const Loader = ({ isLoading }: { isLoading: boolean }) => {
    return isLoading ? (
        <div className="animation-container">
            <span className="animating-letter animation-m">M</span>
            <span className="animating-letter animation-d">D</span>
            <div className="animation-word">FITNESS</div>
        </div>
    ) : null;
};

export default Loader;
