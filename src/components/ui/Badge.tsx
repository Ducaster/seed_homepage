interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full bg-seed-green-50 text-seed-green-700 ${className}`}
    >
      {children}
    </span>
  );
}
