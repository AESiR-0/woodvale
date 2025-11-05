import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dish } from "@/utils/dishesData";

interface DishSelectorProps {
  dishes: Dish[];
  visibleDishes: Dish[];
  activeDish: number;
  carouselIndex: number;
  totalPages: number;
  onDishClick: (dishId: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export default function DishSelector({
  visibleDishes,
  activeDish,
  carouselIndex,
  totalPages,
  onDishClick,
  onPrevClick,
  onNextClick,
}: DishSelectorProps) {
  return (
    <div className="flex justify-center items-center gap-3 sm:gap-2 md:gap-0 lg:gap-0 w-full flex-shrink-0">
      <ChevronLeft
        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-200 flex-shrink-0 ${
          carouselIndex > 0
            ? "text-[var(--muted)] hover:text-[var(--muted)]/80 hover:scale-110"
            : "text-[var(--muted)]/30 opacity-50 cursor-not-allowed"
        }`}
        onClick={onPrevClick}
      />
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 flex-1 h-24 sm:h-28 md:h-32 overflow-hidden">
        <div className="flex gap-1.5 sm:gap-2 md:gap-3 transition-transform duration-500 ease-out">
          {visibleDishes.map((d, index) => (
            <div
              key={`selector-${d.id ?? index}`}
              onClick={() => onDishClick(d.id!)}
              className={`cursor-pointer flex-1 min-w-0 h-full flex flex-col items-center justify-center transition-all duration-300 ${
                activeDish === d.id
                  ? "text-[var(--muted)] scale-100 sm:scale-105 px-1 sm:px-2 pt-1 bg-white/20 rounded-lg sm:rounded-xl"
                  : "scale-90 opacity-60 hover:opacity-80 hover:scale-95"
              }`}
              style={{
                animation: `fadeSlideIn 0.4s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="rounded-full overflow-hidden w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0">
                <img
                  src={d.image ?? ""}
                  alt={d.name ?? ""}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] sm:text-[11px] md:text-xs text-center mt-1 px-0.5 leading-tight line-clamp-2">
                {(d.name ?? "").toLowerCase()}
                <br />
                {(d.subtitle ?? "").toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </div>
      <ChevronRight
        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-200 flex-shrink-0 ${
          carouselIndex < totalPages - 1
            ? "text-[var(--muted)] hover:text-[var(--muted)]/80 hover:scale-110"
            : "text-[var(--muted)]/30 opacity-50 cursor-not-allowed"
        }`}
        onClick={onNextClick}
      />
    </div>
  );
}

