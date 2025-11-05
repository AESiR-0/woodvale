import React from "react";
import { Dish, CategoryType } from "@/utils/dishesData";

interface CategoryNavigationProps {
  activeCategory: CategoryType;
  dishes: Dish[];
  carouselIndex: number;
  totalPages: number;
  DISHES_PER_VIEW: number;
  onCategoryChange: (category: CategoryType) => void;
  onPageClick: (pageIndex: number) => void;
}

export default function CategoryNavigation({
  activeCategory,
  dishes,
  carouselIndex,
  totalPages,
  DISHES_PER_VIEW,
  onCategoryChange,
  onPageClick,
}: CategoryNavigationProps) {
  return (
    <div className="flex flex-col gap-4 sm:gap-3 w-full flex-shrink-0">
      {/* Carousel Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => onPageClick(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === carouselIndex
                  ? "bg-[var(--muted)] w-5 sm:w-6 h-1.5"
                  : "bg-[var(--muted)]/40 hover:bg-[var(--muted)]/60 w-1.5 h-1.5"
              }`}
            />
          ))}
        </div>
      )}

      {/* Category Buttons */}
      <div className="backdrop-blur-3xl px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 flex justify-center gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto scrollbar-hide rounded-full">
        {(["food", "entrees", "drinks", "cocktails", "brunch"] as CategoryType[]).map(
          (cat) => (
            <button
              key={cat}
              onClick={() => {
                if (activeCategory !== cat) {
                  onCategoryChange(cat);
                }
              }}
              className={`flex-shrink-0 py-1 sm:py-1.5 px-2.5 sm:px-3 md:px-4 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[var(--muted)] text-gray-700 scale-100 sm:scale-105"
                  : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          )
        )}
      </div>
    </div>
  );
}

