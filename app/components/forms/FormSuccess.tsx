import { CheckCircle, MessageCircle } from "lucide-react";

interface FormSuccessProps {
  message: string;
  className?: string;
  whatsappLink?: string;
  whatsappText?: string;
}

export function FormSuccess({
  message,
  className = "",
  whatsappLink,
  whatsappText,
}: FormSuccessProps) {
  return (
    <div
      role="status"
      className={`p-4 bg-tea-green/30 border border-tea-green  ${className}`}
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-paynes-gray font-body">{message}</p>
      </div>

      {whatsappLink && whatsappText && (
        <div className="mt-4 pt-4 border-t border-tea-green/50">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-paynes-gray hover:text-green-700 font-body transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{whatsappText}</span>
          </a>
        </div>
      )}
    </div>
  );
}
