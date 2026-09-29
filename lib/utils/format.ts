export function formatPrice(price: number, currency: 'USD' | 'NPR' = 'NPR'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  }

  // Every real price on this platform is NPR — `Intl`'s 'ne-NP' locale renders
  // Devanagari numerals, which reads as broken on this English-language site.
  // Match the "Rs 1,450" convention used platform-wide (funtush-frontend,
  // funtush-admin) instead of Intl's currency formatting.
  return `Rs ${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(price)}`;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDuration(days: number): string {
  if (days === 1) return '1 day';
  return `${days} days`;
}

export function formatReadTime(minutes: number): string {
  if (minutes < 1) return 'Less than 1 min read';
  return `${minutes} min read`;
}
