'use client';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md' }: SpinnerProps) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size];

  return (
    <div
      className={`${sizeClass} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
    />
  );
}
