import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", hasError, ...props }, ref) => {
    const baseStyles = `
      w-full px-4 py-3
      bg-cornsilk/50 border border-sand
      
      font-body text-deep-slate
      placeholder:text-deep-slate/50
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-tea-green focus:border-transparent
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const errorStyles = hasError
      ? "border-red-400 focus:ring-red-300"
      : "";

    return (
      <input
        ref={ref}
        className={`${baseStyles} ${errorStyles} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
