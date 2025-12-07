import { forwardRef } from "react";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", hasError, ...props }, ref) => {
    const baseStyles = `
      w-full px-4 py-3
      bg-cornsilk/50 border border-beige
      rounded-lg
      font-body text-paynes-gray
      placeholder:text-paynes-gray/50
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-tea-green focus:border-transparent
      disabled:opacity-50 disabled:cursor-not-allowed
      resize-vertical min-h-[120px]
    `;

    const errorStyles = hasError ? "border-red-400 focus:ring-red-300" : "";

    return (
      <textarea
        ref={ref}
        className={`${baseStyles} ${errorStyles} ${className}`.trim()}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";
