import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "bordered";
}

const variantStyles = {
  default: "bg-white",
  elevated: "bg-white shadow-lg shadow-black/5",
  bordered: "bg-white border border-seed-earth-200",
};

export default function Card({
  children,
  className = "",
  variant = "default",
}: CardProps) {
  return (
    <div className={`rounded-2xl p-6 ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}
