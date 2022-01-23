import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string | "text";
  value: string;
  setValue: (value: string) => void;
  error?: Record<string, string>
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, setValue, error, required = false }) => {
  const errorType = label.toLowerCase();
  return (
    <div className="flex flex-col mb-6">
      <label className="text-[16px] mb-2" htmlFor={label}>
        {label}
      </label>
      <input
        value={value} onChange={(e) => setValue(e.target.value)}
        className="w-full border-2 border-gray-400 p-2 rounded-lg outline-none"
        id={label} type={type} placeholder={label} required={required}
      />
      {error[errorType] ? <p className="text-red-500 text-sm text-left mt-1">{error[errorType]}</p> : null}
    </div>
  );
}
export default InputField;

