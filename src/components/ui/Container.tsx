import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  narrow,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto px-7",
        narrow ? "max-w-[760px]" : "max-w-[1100px]",
        className
      )}
    >
      {children}
    </div>
  );
}
