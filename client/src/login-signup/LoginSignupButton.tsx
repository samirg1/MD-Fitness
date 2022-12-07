import Button from "@mui/material/Button";

type TLoginSignupButton = {
    text: string;
    disabled: boolean;
    onClick: () => void;
};

const LoginSignupButton = ({ text, disabled, onClick }: TLoginSignupButton) : JSX.Element => {
    return (
        <Button disabled={disabled} variant="outlined" onClick={onClick}>
            {text}
        </Button>
    );
};

export default LoginSignupButton;
