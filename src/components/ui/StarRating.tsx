'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  maxStars?: number;
  size?: number;
  allowHalf?: boolean;
  readonly?: boolean;
  className?: string;
}

const StarRating = ({
  rating,
  onRatingChange,
  maxStars = 5,
  size = 24,
  allowHalf = false,
  readonly = false,
  className = '',
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (starIndex: number, isHalf?: boolean) => {
    if (readonly || !onRatingChange) return;
    const newRating = allowHalf && isHalf ? starIndex + 0.5 : starIndex + 1;
    onRatingChange(newRating);
  };

  const handleMouseMove = (starIndex: number, event: React.MouseEvent) => {
    if (readonly) return;

    if (allowHalf) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const isLeftHalf = x < rect.width / 2;
      setHoverRating(isLeftHalf ? starIndex + 0.5 : starIndex + 1);
    } else {
      setHoverRating(starIndex + 1);
    }
  };

  const getStarFill = (starIndex: number) => {
    const currentRating = hoverRating || rating;
    const starValue = starIndex + 1;

    if (currentRating >= starValue) return 'full';
    if (currentRating >= starValue - 0.5) return 'half';
    return 'empty';
  };

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      onMouseLeave={() => !readonly && setHoverRating(0)}
    >
      {Array.from({ length: maxStars }, (_, index) => {
        const fillType = getStarFill(index);

        return (
          <div
            key={index}
            className={`relative transition-transform duration-200 ease-out ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            }`}
            onClick={() => handleClick(index)}
            onMouseMove={(e) => handleMouseMove(index, e)}
          >
            {/* Background star */}
            <Star size={size} className="text-warning transition-colors duration-200" />

            {/* Filled star overlay */}
            <div
              className="absolute inset-0 overflow-hidden transition-all duration-200 ease-out"
              style={{
                width: fillType === 'half' ? '50%' : fillType === 'full' ? '100%' : '0%',
              }}
            >
              <Star size={size} className="fill-warning text-warning transition-all duration-200" />
            </div>

            {/* Click areas for half stars */}
            {allowHalf && !readonly && (
              <>
                <div
                  className="absolute inset-0 w-1/2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(index, true);
                  }}
                />
                <div
                  className="absolute inset-0 left-1/2 w-1/2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(index, false);
                  }}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;

// <StarRating rating={rating || 0} readonly size={18} />
{
  /* <StarRating
  rating={averageRating}
  maxStars={5}
  size={16}
  readonly={true}
  allowHalf={true}
/>; */
}
