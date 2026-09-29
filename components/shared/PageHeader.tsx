import { cn } from '@/lib/utils/cn';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8 sm:mb-10', className)}>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-base text-gray-600 sm:text-lg">{subtitle}</p>}
    </div>
  );
}
