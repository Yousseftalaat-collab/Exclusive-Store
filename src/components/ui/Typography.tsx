import clsx from "clsx";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={clsx("text-2xl font-heading font-bold", className)}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={clsx("text-2xl font-heading", className)}>{children}</h2>
  );
}

export function Text({ children, className }: TypographyProps) {
  return <p className={clsx("text-sm", className)}>{children}</p>;
}
