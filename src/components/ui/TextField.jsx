import { forwardRef } from "react";

const TextField = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      value,
      onChange,
      onBlur,
      placeholder,
      autoComplete,
      error,
      helperText,
      className = "",
      required = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition-all focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200";

    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
          ref={ref}
          className={`${baseStyles} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-300" : ""}`}
          required={required}
          {...props}
        />
        {error ? (
          <p id={`${name}-error`} className="text-sm text-red-500">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${name}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
