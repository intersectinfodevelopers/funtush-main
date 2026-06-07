interface RatingSummaryProps {
  rating: number;
  reviewCount: number;
}

export function RatingSummary({ rating, reviewCount }: RatingSummaryProps) {
  const percentage = (rating / 5) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="text-3xl font-bold">{rating.toFixed(1)}</div>
        <div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }
              >
                ★
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Based on {reviewCount} reviews
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-12">{stars} star</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
