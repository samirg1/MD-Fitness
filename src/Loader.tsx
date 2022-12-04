import "./Loader.css";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
    return isLoading ? (
        <div className="animation-container">
            <span className="animating-letter animation-m">M</span>
            <span className="animating-letter animation-d">D</span>
            <div className="animation-word">FITNESS</div>
        </div>
    ) : (
        null
    );
};

export default Loader;
