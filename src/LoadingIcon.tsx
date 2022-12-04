import "./LoadingIcon.css";

const LoadingIcon = () => {
    return (
        <div className="animation-container">
            <span className="animating-letter animation-m">M</span>
            <span className="animating-letter animation-d">D</span>
            <div className="animation-word">FITNESS</div>
        </div>
    );
};

export default LoadingIcon;
