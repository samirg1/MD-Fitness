import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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
    text = "text"
}

const Field = ({ name, value, setValue, disabled, type }: TField) => {
    return (
        <>
            <Typography>{name}</Typography>
            <TextField
                type={type}
                disabled={disabled}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
            />
        </>
    );
};

export default Field;
