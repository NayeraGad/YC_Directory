import React from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  placeholder?: string;
  type?: "input" | "textarea";
};

const FormField = ({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "input",
}: FormFieldProps) => (
  <div>
    <label htmlFor={id} className="startup-form_label">
      {label}
    </label>
    {type === "textarea" ? (
      <Textarea
        id={id}
        name={id}
        className="!startup-form_textarea"
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
      />
    ) : (
      <Input
        id={id}
        name={id}
        className="!startup-form_input"
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
      />
    )}
    {error && <p className="startup-form_error">{error}</p>}
  </div>
);

export default FormField;
