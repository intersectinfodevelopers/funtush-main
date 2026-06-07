export function formatPrice(price: number, currency: 'USD' | 'NPR' = 'USD'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  }
  
  return new Intl.NumberFormat('ne-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 0,
  }).format(price);
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
