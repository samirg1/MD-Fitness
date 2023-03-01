import { fieldRegex } from "../login-signup/Field";

type TEditableField = {
    isEditing: boolean;
    type: "password" | "email" | "text";
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const EditableField = ({
    isEditing,
    type,
    value,
    setValue,
    error,
    setError,
}: TEditableField) => {
    return (
        <input
            className={`editable-field ${error ? "error" : ""}`}
            type={type}
            color="secondary"
            disabled={!isEditing}
            placeholder={type === "password" ? "********" : ""}
            autoComplete="new-password"
            style={{
                color: "white",
                border: `1px solid ${
                    error ? "red" : isEditing ? "white" : "transparent"
                }`,
                background: "none",
                padding: "16px",
            }}
            value={value}
            onChange={(event) => {
                if (
                    !event.target.value.match(fieldRegex[type]) &&
                    (type !== "password" || event.target.value !== "")
                ) {
                    setError(`${type} field invalid`);
                } else setError(null);
                setValue(event.target.value);
            }}
        />
    );
};

export default EditableField;
