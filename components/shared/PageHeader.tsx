import { cn } from '@/lib/utils/cn';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
    </div>
  );
}
