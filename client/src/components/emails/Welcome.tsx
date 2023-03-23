import { Heading, Text } from "@react-email/components";
import EmailTemplate from "./EmailTemplate";

const Welcome = () => (
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
                Welcome to MD-Fitness %USER_NAME%!
            </Heading>
            <Text
                style={{
                    fontSize: "20px",
                    lineHeight: "28px",
                    marginBottom: "30px",
                }}
            >
                Your account has been successfully created and confirmed.
                <br /> <br />
                To get started view the available{" "}
                <a
                    href={`${process.env.REACT_APP_DOMAIN}/programs`}
                    target="_blank"
                    rel="noreferrer"
                >
                    programs
                </a>{" "}
                on my website or contact me directly through the social links
                below.
            </Text>
        </>
    </EmailTemplate>
);

export default Welcome;
