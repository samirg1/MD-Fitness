import { Heading, Link, Section, Text } from "@react-email/components";
import EmailTemplate from "./EmailTemplate";

const ConfirmEmail = () => {
    return (
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
                    Confirm your email address
                </Heading>
                <Text
                    style={{
                        fontSize: "20px",
                        lineHeight: "28px",
                        marginBottom: "30px",
                    }}
                >
                    Click the link below to confirm your email and get started.
                </Text>

                <Section
                    style={{
                        background: "rgb(245, 244, 245)",
                        borderRadius: "4px",
                        marginRight: "50px",
                        marginBottom: "30px",
                        padding: "43px 23px",
                        textAlign: "center",
                    }}
                >
                    <Link
                        style={{
                            fontSize: "30px",
                            textAlign: "center",
                            verticalAlign: "middle",
                            textTransform: "uppercase",
                        }}
                        href={`${process.env.DOMAIN}/confirm-email/%CONFIRMATION_TOKEN%`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        confirm
                    </Link>
                </Section>

                <Text
                    style={{
                        color: "#000",
                        fontSize: "14px",
                        lineHeight: "24px",
                    }}
                >
                    If you didn't request this email, there's nothing to worry
                    about - you can safely ignore it.
                </Text>
            </>
        </EmailTemplate>
    );
};

export default ConfirmEmail;
