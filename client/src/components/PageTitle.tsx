import "./pageTitle.css";

/**
 * Reusable component for a page title.
 * @param children The children (or string) to display in the title.
 * @param size The size of the title (small or large).
 * @returns The page title component.
 */
const PageTitle = ({
    children,
    size = "large",
}: {
    children: JSX.Element | string;
    size?: "large" | "small";
}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h3 className={`animate-character ${size}`}>{children}</h3>
                </div>
            </div>
        </div>
    );
};

export default PageTitle;
