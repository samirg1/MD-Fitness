import {
    Body,
    Column,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import LINKS from "../config/links";

const EmailTemplate = ({ children }: { children: JSX.Element }) => {
    return (
        <Html>
            <Head />
            <Preview>Confirm your email address</Preview>
            <Body
                style={{
                    backgroundColor: "#ffffff",
                    margin: "0 auto",
                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                }}
            >
                <Container
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                    }}
                >
                    <Section
                        style={{
                            marginTop: "32px",
                            textAlign: "center",
                        }}
                    >
                        <Img
                            src="cid:logo"
                            width="60"
                            height="60"
                            alt="MD-Fitness"
                            style={{ display: "inline" }}
                        />
                        <Text
                            style={{
                                color: "#1d1c1d",
                                textTransform: "uppercase",
                                fontSize: "36px",
                                fontWeight: "700",
                                margin: "30px 0",
                                padding: "0",
                                lineHeight: "42px",
                            }}
                        >
                            MD-Fitness
                        </Text>
                    </Section>
                    {children}
                    <Section>
                        <Row
                            style={{
                                marginBottom: "32px",
                                paddingLeft: "8px",
                                paddingRight: "8px",
                                width: "100%",
                            }}
                        >
                            <Column style={{ width: "100%" }}>
                                <Img
                                    src="cid:logo"
                                    width="60"
                                    height="60"
                                    alt="MD-Fitness"
                                />
                            </Column>
                            <Column>
                                <Row>
                                    <Column>
                                        <Link href={LINKS.instagram}>
                                            <Img
                                                src="cid:instagram_icon"
                                                width="32"
                                                height="32"
                                                alt="Instagram"
                                                style={{
                                                    display: "inline",
                                                    marginLeft: "32px",
                                                }}
                                            />
                                        </Link>
                                    </Column>
                                    <Column>
                                        <Link href={LINKS.tiktok}>
                                            <Img
                                                src="cid:tiktok_icon"
                                                width="32"
                                                height="32"
                                                alt="TikTok"
                                                style={{
                                                    display: "inline",
                                                    marginLeft: "32px",
                                                }}
                                            />
                                        </Link>
                                    </Column>
                                </Row>
                            </Column>
                        </Row>
                    </Section>

                    <Section>
                        <Link
                            style={{
                                color: "#b7b7b7",
                                textDecoration: "underline",
                            }}
                            href={`${process.env.REACT_APP_DOMAIN}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Home
                        </Link>
                        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        <Link
                            style={{
                                color: "#b7b7b7",
                                textDecoration: "underline",
                            }}
                            href={`${process.env.REACT_APP_DOMAIN}/about`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            About
                        </Link>
                        <Text
                            style={{
                                fontSize: "12px",
                                color: "#b7b7b7",
                                lineHeight: "15px",
                                textAlign: "left",
                                marginBottom: "50px",
                            }}
                        >
                            ©2023 MD-Fitness <br />
                            <br />
                            All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default EmailTemplate;
