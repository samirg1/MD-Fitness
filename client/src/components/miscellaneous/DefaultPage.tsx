const DefaultPage = ({displayText} : {displayText: string}) => {
    return (
        <div
            style={{
                display: "table-cell",
                verticalAlign: "middle",
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
                width: "150px",
                aspectRatio: "1",
                background: "rgb(41, 72, 157)",
                color: "white",
                textAlign: "center",
                borderRadius: "25%"
            }}
        >
            <span
                style={{
                    position: "relative",
                    top: "25%",
                    left: "0%",
                }}
            >
                {displayText}
            </span>
        </div>
    );
};

export default DefaultPage;