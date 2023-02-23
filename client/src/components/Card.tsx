import "./Card.css";

/**
 * Reusable card component
 * @param title The title component of the card.
 * @param onClick The onclick event function.
 * @param navTitle The text to display with the arrow button.
 * @param children The content to display in the card.
 * @returns The card component.
 */
const Card = ({
    title,
    onClick,
    navTitle,
    children,
    disabled = false,
}: {
    title: JSX.Element | string;
    onClick: () => void;
    navTitle?: string;
    children?: JSX.Element | string;
    disabled?: boolean;
}) => {
    return (
        <button className="card" type="button" disabled={disabled} onClick={() => onClick()}>
            <h3 className="card__title">{title}</h3>
            <p className="card__content">{children}</p>
            <br />
            <div className="card__arrow">
                {navTitle}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="15"
                    width="15"
                >
                    <path
                        fill="#fff"
                        d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
                    ></path>
                </svg>
            </div>
        </button>
    );
};

export default Card;
