import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { forwardRef, useState } from "react";

/**
 * The prop types of a field for login and signup forms.
 */
type TField = {
    name: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    disabled: boolean;
    type: FieldType;
};

/**
 * The type of a field for login and signup forms.
 */
export enum FieldType {
    password = "password",
    email = "email",
    text = "text",
}

/**
 * Tooltips for each field type to be displayed for accessability.
 */
const fieldTooltips = {
    password:
        "Minimum 8 characters with a lowercase and uppercase letter, a number and a symbol",
    email: "Enter a valid email",
    text: "Maximum 50 characters",
};

/**
 * RegExp patters for each field type for easy to see validation.
 */
const fieldRegex = {
    password: new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
    ),
    email: new RegExp("^[A-z0-9._%+-]+@[A-z0-9.-]{2,}\\.[A-z]{2,}$"),
    text: new RegExp("^.{1,50}$"),
};

/**
 * Component representing a field in a form.
 * @param name The name of the field.
 * @param value The value of the field.
 * @param setValue Setter for the value of the field.
 * @param disabled Whether the field is disabled or not.
 * @param type The type of the field.
 */
const Field = (
    { name, value, setValue, disabled, type }: TField,
    ref: React.ForwardedRef<HTMLInputElement | undefined>
) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <Typography color="white">{name}</Typography>
            <Tooltip
                title={fieldTooltips[type]}
                enterTouchDelay={0} // for mobile devices
                leaveTouchDelay={5000} // for mobile devices
            >
                <div style={{ display: "inline" }}>
                    <OutlinedInput
                        color="secondary"
                        sx={{
                            color: "white",
                            border: "1px solid white !important",
                        }}
                        inputRef={ref}
                        required
                        error={!value.match(fieldRegex[type])}
                        disabled={disabled}
                        type={
                            showPassword && type === FieldType.password // ensure we account for password visibility
                                ? FieldType.text
                                : type
                        }
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        endAdornment={
                            type === FieldType.password ? (
                                <InputAdornment position="end">
                                    {/* Visibility button */}
                                    <IconButton
                                        disabled={disabled}
                                        onClick={() =>
                                            setShowPassword(
                                                (previous) => !previous
                                            )
                                        }
                                        edge="end"
                                        color="secondary"
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
                </div>
            </Tooltip>
        </>
    );
};

export default forwardRef(Field);
