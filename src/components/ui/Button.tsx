import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,

  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-primary text-white hover:bg-primary/90": variant === "primary",
          "bg-dark text-white hover:bg-dark/90": variant === "secondary",
          "border border-dark text-dark hover:bg-dark hover:text-white":
            variant === "outline",
          "w-full": fullWidth,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
