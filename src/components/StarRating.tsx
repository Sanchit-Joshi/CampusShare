import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = 16,
  className = "",
}: StarRatingProps) => {
  // Ensure rating is between 0 and maxRating
  const safeRating = Math.max(0, Math.min(rating, maxRating));
  
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(maxRating)].map((_, i) => {
        const starFill = i < Math.floor(safeRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300";
        const isHalfStar = i === Math.floor(safeRating) && safeRating % 1 >= 0.5;
        
        return (
          <div key={i} className="relative">
            <Star
              size={size}
              className={`${starFill} transition-colors`}
              fill={i < Math.floor(safeRating) ? "currentColor" : "none"}
            />
            {isHalfStar && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star
                  size={size}
                  className="text-yellow-400 fill-yellow-400"
                  fill="currentColor"
                />
              </div>
            )}
          </div>
        );
      })}
      <span className="ml-1 text-sm font-medium">{safeRating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;