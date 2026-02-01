// components/ui/PasswordInput.tsx
import { useState } from "react";
import Input from "./Input"; // Your existing Input component

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function PasswordInput({
  className,
  ...props
}: PasswordInputProps) {
  const [show, setShow] = useState(false); // toggle password visibility

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"} // change type based on toggle
        className={`${className} pr-10`} // add padding for icon
        {...props}
      />
      <span
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? (
          // Eye open icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zM10 15a5 5 0 110-10 5 5 0 010 10z" />
            <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
          </svg>
        ) : (
          // Eye closed icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0110 19c-5 0-8.27-4.11-9-7a10.05 10.05 0 012.182-3.78m2.343-2.342A9.956 9.956 0 0110 5c5 0 8.27 4.11 9 7a10.05 10.05 0 01-1.65 3.044M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3l18 18"
            />
          </svg>
        )}
      </span>
    </div>
  );
}
