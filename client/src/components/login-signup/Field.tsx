import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";

type TField = {
    name: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    disabled: boolean;
    type: FieldType;
};

export enum FieldType {
    password = "password",
    email = "email",
    text = "text",
}

const fieldTooltips = {
    password:
        "Minimum 8 characters with a lowercase and uppercase letter, a number and a symbol",
    email: "Enter a valid email",
    text: "Maximum 50 characters",
};

const Field = ({ name, value, setValue, disabled, type }: TField) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword((previous) => !previous);

    return (
        <>
            <Typography>{name}</Typography>
            <FormControl variant="outlined">
                <Tooltip title={fieldTooltips[type]} enterTouchDelay={0} leaveTouchDelay={5000}>
                    <OutlinedInput
                        disabled={disabled}
                        type={
                            showPassword && type === FieldType.password
                                ? FieldType.text
                                : type
                        }
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        endAdornment={
                            type === FieldType.password ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        disabled={disabled}
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }
                    />
                </Tooltip>
            </FormControl>
        </>
    );
};

export default Field;
