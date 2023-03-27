import EmailTemplate from "./EmailTemplate";

const PurchaseConfirmation = () => (
    <EmailTemplate
        title="Purchase Confirmed!"
        mainText={
            <>
                '%PRODUCT_NAME%' has been successfully purchased.
                <br /> <br />
                To get started view the program on your{" "}
                <a
                    href={`${process.env.REACT_APP_DOMAIN}/account`}
                    target="_blank"
                    rel="noreferrer"
                >
                    account
                </a>{" "}
                page.
            </>
        }
    />
);

export default PurchaseConfirmation;
