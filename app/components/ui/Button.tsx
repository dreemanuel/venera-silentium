import { Link } from "react-router";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  as?: "button" | "link" | "a";
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-paynes-gray text-cornsilk hover:bg-paynes-gray/90 focus-visible:ring-paynes-gray",
  secondary:
    "bg-tea-green text-paynes-gray hover:bg-tea-green/90 focus-visible:ring-tea-green",
  ghost:
    "bg-transparent text-paynes-gray hover:bg-beige/50 focus-visible:ring-paynes-gray",
  outline:
    "bg-transparent border-2 border-paynes-gray text-paynes-gray hover:bg-paynes-gray hover:text-cornsilk focus-visible:ring-paynes-gray",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  children,
  disabled,
  type = "button",
  onClick,
  as = "button",
  to,
  href,
  target,
  rel,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-heading font-medium tracking-wide
    transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="flex-shrink-0">{rightIcon}</span>
      )}
    </>
  );

  if (as === "link" && to) {
    return (
      <Link to={to} className={combinedClassName} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (as === "a" && href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClassName}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
