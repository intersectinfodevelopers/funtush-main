import { cn } from '@/lib/utils/cn';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Narrow reading width for text-heavy pages (about, terms, contact…). */
  narrow?: boolean;
}

/** The one place page gutters and vertical rhythm are defined. */
export function PageContainer({ children, className, narrow }: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-8',
        narrow ? 'max-w-4xl' : 'max-w-7xl',
        className
      )}
    >
      {children}
    </div>
  );
}
