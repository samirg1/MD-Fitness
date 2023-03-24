import EmailTemplate from "./EmailTemplate";

const Welcome = () => (
    <EmailTemplate
        title="Welcome to MD-Fitness %USER_NAME%!"
        mainText={
            <>
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
            </>
        }
    />
);

export default Welcome;
