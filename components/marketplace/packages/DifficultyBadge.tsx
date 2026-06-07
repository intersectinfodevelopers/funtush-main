import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface DifficultyBadgeProps {
  difficulty: string;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const colors: Record<string, string> = {
    Easy: 'bg-green-100 text-green-800',
    Moderate: 'bg-blue-100 text-blue-800',
    Strenuous: 'bg-yellow-100 text-yellow-800',
    Extreme: 'bg-red-100 text-red-800',
  };

  return (
    <Badge className={`${colors[difficulty] || colors.Easy}`}>
      {difficulty}
    </Badge>
  );
}
