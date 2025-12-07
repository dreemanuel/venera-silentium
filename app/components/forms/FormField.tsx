interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  optionalText?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  name,
  error,
  optional,
  optionalText = "optional",
  children,
  className = "",
}: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={name}
        className="block font-heading text-sm font-medium text-paynes-gray"
      >
        {label}
        {optional && (
          <span className="ml-1 text-paynes-gray/60 font-normal">
            ({optionalText})
          </span>
        )}
      </label>

      <div>
        {children}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-red-600 flex items-center gap-1"
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
