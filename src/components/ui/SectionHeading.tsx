interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-12 ${alignClass}`}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-seed-earth-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-seed-earth-700 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
