import Input from "@mui/material/Input";
import { fieldRegex } from "../login-signup/Field";

type TEditableField = {
    isEditing: boolean;
    type: "password" | "email" | "text";
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    error: boolean;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditableField = ({ isEditing, type, value, setValue, error, setError }: TEditableField) => {
    return (
        <input
            className={`editable-field ${error ? "error" : ""}`}
            type="text"
            color="secondary"
            disabled={!isEditing}
            style={{
                color: "white",
                border: `1px solid ${
                    error ? "red" : isEditing ? "white" : "transparent"
                    }`,
                background: "none",
                padding: "16px"
            }}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
                setError(!event.target.value.match(fieldRegex[type]));
            }}
        />
    );
};

export default EditableField;
