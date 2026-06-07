import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface NavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
}

export function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'transition-colors',
        isActive
          ? 'text-blue-600 font-medium'
          : 'text-gray-600 hover:text-gray-900'
      )}
    >
      {label}
    </Link>
  );
}
