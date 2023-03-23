import { Heading, Text } from "@react-email/components";
import EmailTemplate from "./EmailTemplate";

const PurchaseConfirmation = () => (
    <EmailTemplate>
        <>
                <Heading
                    style={{
                        color: "#1d1c1d",
                        fontSize: "30px",
                        fontWeight: "400",
                        margin: "30px 0",
                        padding: "0",
                        lineHeight: "42px",
                    }}
                >
                    Purchase Confirmed!
                </Heading>
                <Text
                    style={{
                        fontSize: "20px",
                        lineHeight: "28px",
                        marginBottom: "30px",
                    }}
                >
                '%PRODUCT_NAME%' has been successfully purchased.
                <br /> <br />
                To get started view the program on your <a href={`${process.env.REACT_APP_DOMAIN}/account`} target="_blank" rel="noreferrer">account</a> page.
                </Text>
            </>
    </EmailTemplate>
);

export default PurchaseConfirmation;