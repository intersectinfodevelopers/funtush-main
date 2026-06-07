interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ title, subtitle, align = 'left' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : '';

  return (
    <div className={`mb-8 ${alignClass}`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  );
}
