import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-dark">
          {label}
        </label>
      )}

      <input
        id={id}
        className={clsx(
          "w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary",
          error ? "border-primary focus:ring-primary" : "border-border",
          className
        )}
        {...props}
      />

      {error && <p className="text-xs text-primary">{error}</p>}
    </div>
  );
}
