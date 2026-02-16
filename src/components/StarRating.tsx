'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  totalRatings?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRate?: (rating: number) => void;
  showCount?: boolean;
}

export function StarRating({
  rating,
  totalRatings = 0,
  size = 'md',
  interactive = false,
  onRate,
  showCount = true
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  const displayRating = hoverRating || rating;
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= displayRating;
          const halfFilled = !filled && star - 0.5 <= displayRating;
          
          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRate?.(star)}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            >
              <Star
                className={`${sizeClasses[size]} ${
                  filled
                    ? 'text-yellow-400 fill-yellow-400'
                    : halfFilled
                    ? 'text-yellow-400 fill-yellow-400/50'
                    : 'text-gray-500'
                }`}
              />
            </button>
          );
        })}
      </div>
      
      {showCount && (rating > 0 || totalRatings > 0) && (
        <span className={`${textSizeClasses[size]} text-gray-400 ml-1`}>
          {rating > 0 && (
            <span className="text-white font-medium">{rating.toFixed(1)}</span>
          )}
          {totalRatings > 0 && (
            <span className="ml-1">({totalRatings})</span>
          )}
        </span>
      )}
    </div>
  );
}

// Compact display version for cards
export function StarRatingDisplay({
  rating,
  totalRatings = 0,
  size = 'sm'
}: {
  rating: number;
  totalRatings?: number;
  size?: 'sm' | 'md';
}) {
  if (totalRatings === 0) {
    return (
      <span className="text-xs text-gray-500">No ratings yet</span>
    );
  }
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  };
  
  return (
    <div className="flex items-center gap-1">
      <Star className={`${sizeClasses[size]} text-yellow-400 fill-yellow-400`} />
      <span className="text-sm text-white font-medium">{rating.toFixed(1)}</span>
      <span className="text-xs text-gray-400">({totalRatings})</span>
    </div>
  );
}
