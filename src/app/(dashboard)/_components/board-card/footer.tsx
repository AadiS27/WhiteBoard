import { cn } from "@/lib/utils";
import { Star } from 'lucide-react';

interface FooterProps {
  isFavourite: boolean;
  authorLabel: string;
  createdAtLabel: string;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  isFavourite,
  authorLabel,
  createdAtLabel,
  disabled,
  onClick,
}: FooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  };

  return (
    <div className="relative p-3 bg-gradient-to-r from-white to-gray-50 border-t border-gray-100 rounded-b-lg transition-all duration-200 group-hover:shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-muted-foreground transition-opacity duration-200 flex items-center gap-2">
          <span className="font-medium text-gray-700">{authorLabel}</span>
          <span className="text-gray-400">•</span>
          <span>{createdAtLabel}</span>
        </p>
        
        <button
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            "p-1.5 rounded-full transition-all duration-200 hover:bg-yellow-50 hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200",
            disabled && "cursor-not-allowed opacity-50"
          )}
          aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star
            className={cn(
              "h-4 w-4 transition-transform duration-200 group-hover:scale-110",
              isFavourite && "fill-yellow-500 text-yellow-500"
            )}
          />
        </button>
      </div>
    </div>
  );
};
