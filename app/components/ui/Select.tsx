import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", hasError, children, ...props }, ref) => {
    const baseStyles = `
      w-full px-4 py-3 pr-10
      bg-cornsilk/50 border border-beige
      
      font-body text-paynes-gray
      appearance-none
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-tea-green focus:border-transparent
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const errorStyles = hasError ? "border-red-400 focus:ring-red-300" : "";

    return (
      <div className="relative">
        <select
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${className}`.trim()}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-paynes-gray/60 pointer-events-none" />
      </div>
    );
  }
);

Select.displayName = "Select";
