import type { ChangeEventHandler, ReactNode } from "react";

interface FormFieldProps {
  autoComplete?: string;
  id: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  rightSlot?: ReactNode;
  type?: "email" | "password" | "text";
  value: string;
}

export const FormField = ({
  autoComplete,
  id,
  label,
  onChange,
  placeholder,
  rightSlot,
  type = "text",
  value,
}: FormFieldProps) => {
  if (!rightSlot) {
    return (
      <div className="input_group">
        <label htmlFor={id}>{label}</label>
        <input
          autoComplete={autoComplete}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>
    );
  }

  return (
    <div className="input_group">
      <label htmlFor={id}>{label}</label>
      <div className="input-with-button">
        <input
          autoComplete={autoComplete}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        {rightSlot}
      </div>
    </div>
  );
};

