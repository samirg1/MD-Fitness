import useStripe from "../../hooks/useStripe";
import Loader from "../Loader";

const Programs = () => {
    const { isLoading, redirectToCheckout } = useStripe();

    return (
        <>
            <Loader isLoading={isLoading} />
            <div>
                <button
                    onClick={redirectToCheckout}
                    disabled={isLoading}
                    style={{
                        width: "20%",
                        height: "20%",
                        fontSize: "20px",
                    }}
                >
                    {isLoading ? "Loading..." : "Buy"}
                </button>
            </div>
        </>
    );
};

export default Programs;
