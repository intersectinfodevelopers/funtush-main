'use client';

import type { FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface HeroSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function HeroSearchBar({
  onSearch,
  placeholder = 'Search treks, agencies, destinations...',
}: HeroSearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          name="search"
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}
