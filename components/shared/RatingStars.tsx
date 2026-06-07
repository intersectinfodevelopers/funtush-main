export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}

export function Rating({ rating }: { rating: number }) {
  return <RatingStars rating={rating} />;
}
