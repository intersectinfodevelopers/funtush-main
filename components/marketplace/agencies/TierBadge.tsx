import { Badge } from '@/components/ui/Badge';

interface TierBadgeProps {
  tier: string;
}

export function TierBadge({ tier }: TierBadgeProps) {
  const colors: Record<string, string> = {
    free: 'bg-gray-100 text-gray-800',
    small: 'bg-blue-100 text-blue-800',
    medium: 'bg-purple-100 text-purple-800',
    large: 'bg-green-100 text-green-800',
  };

  return <Badge className={colors[tier] || colors.free}>{tier}</Badge>;
}
