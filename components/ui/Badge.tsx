'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 rounded-full text-sm font-medium',
        variant === 'default' && 'bg-blue-100 text-blue-800',
        variant === 'success' && 'bg-green-100 text-green-800',
        variant === 'warning' && 'bg-yellow-100 text-yellow-800',
        variant === 'error' && 'bg-red-100 text-red-800',
        className
      )}
    >
      {children}
    </span>
  );
}
