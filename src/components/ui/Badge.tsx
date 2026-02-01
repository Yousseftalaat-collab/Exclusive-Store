import clsx from "clsx";

type BadgeVariant = "primary" | "secondary" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        "min-w-[16px] h-[16px]",

        {
          "bg-primary text-white": variant === "primary",
          "bg-dark text-white": variant === "secondary",
          "border border-dark text-dark": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
