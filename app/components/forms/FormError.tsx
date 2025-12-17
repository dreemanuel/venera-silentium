import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message: string;
  className?: string;
}

export function FormError({ message, className = "" }: FormErrorProps) {
  return (
    <div
      role="alert"
      className={`flex items-center gap-3 p-4 bg-red-50 border border-red-200  ${className}`}
    >
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
      <p className="text-red-800 font-body">{message}</p>
    </div>
  );
}
