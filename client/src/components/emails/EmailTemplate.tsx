import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import LINKS from "../../config/links";

/* 
Email Template looks like this:
-------------------------------------
|              LOGO                 |
|            MD-FITNESS             |
|                                   |
|   {title}                         |
|   {mainText}                      |
|                                   |
|         {codeBoxContent?}         |
|                                   |
|   {children?}                     |
|                                   |
|   {smallText?}                    |    
|                                   |
|    LOGO            SOCIAL LINKS   |
|                                   |
|    HOME | ABOUT                   |
|    COPYRIGHT                      |
-------------------------------------
*/

type TEMailTemplateProps = {
    title: string;
    mainText: string | JSX.Element;
    smallText?: string | JSX.Element;
    codeBoxContent?: string | JSX.Element;
    children?: JSX.Element[] | JSX.Element;
};

const EmailTemplate = ({
    title,
    mainText,
    smallText,
    codeBoxContent,
    children,
}: TEMailTemplateProps) => {
    return (
        <Html>
            <Head />
            <Preview>{title}</Preview>
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
                        {title}
                    </Heading>
                    <Text
                        style={{
                            fontSize: "20px",
                            lineHeight: "28px",
                            marginBottom: "30px",
                        }}
                    >
                        {mainText}
                    </Text>
                    {codeBoxContent && (
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
                            {codeBoxContent}
                        </Section>
                    )}
                    {children}
                    {smallText && (
                        <Text
                            style={{
                                color: "#000",
                                fontSize: "14px",
                                lineHeight: "24px",
                            }}
                        >
                            {smallText}
                        </Text>
                    )}
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
                                                src="cid:instagram"
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
                                                src="cid:tiktok"
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
