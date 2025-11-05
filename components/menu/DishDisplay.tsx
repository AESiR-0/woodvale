import React from "react";
import { Dish } from "@/utils/dishesData";

interface DishDisplayProps {
  currentDish: Dish;
  previousDish: Dish | null;
  scrollDirection: "forward" | "backward";
  showText: boolean;
}

export default function DishDisplay({
  currentDish,
  previousDish,
  scrollDirection,
  showText,
}: DishDisplayProps) {
  const getTextAnimationClass = () => {
    return showText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8";
  };

  return (
    <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-2 sm:gap-3 md:gap-6 lg:gap-22 flex-shrink-0">
      {/* Title - WITH ANIMATION */}
      <div
        className={`text-center md:text-left transition-all flex flex-col duration-500 ease-out flex-shrink-0 ${getTextAnimationClass()}`}
      >
        <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-light text-[var(--muted)] tracking-wide mb-1 md:mb-1">
          {currentDish.name ?? ""}
        </h1>
        <h2 className="text-lg sm:text-lg md:text-lg lg:text-xl font-bold text-[var(--muted)]">
          {currentDish.subtitle ?? ""}
        </h2>
        {currentDish.price && (
          <p className="text-base sm:text-base md:text-base lg:text-lg text-[var(--muted)]/80 mt-0.5">
            ${currentDish.price}
          </p>
        )}

        {/* ✅ Show description only for cocktails */}
        {currentDish.subtitle === "Cocktail" &&
          currentDish.description && (
            <p className="text-sm sm:text-base md:text-base lg:text-md text-[var(--muted)]/70 mt-8 leading-relaxed max-w-md mx-auto md:mx-0">
              {currentDish.description}
            </p>
          )}
      </div>

      {/* Image Container */}
      <div
        className={`relative  flex-shrink-0
        ${
          currentDish.id === 30
            ? "w-48 h-48 sm:w-56 sm:h-56 md:w-56 md:h-56 lg:w-70 lg:h-70"
            : "w-48 h-48 sm:w-56 sm:h-56 md:w-56 md:h-56 lg:w-100 lg:h-100"
        }
        ${
          currentDish.id === 31
            ? "w-48 h-48 sm:w-56 sm:h-56 md:w-56 md:h-56 lg:w-60 lg:h-60"
            : "w-48 h-48 sm:w-56 sm:h-56 md:w-56 md:h-56 lg:w-100 lg:h-100"
        }
        `}
      >
        {previousDish && (
          <div
            className={`absolute inset-0 ${
              scrollDirection === "forward"
                ? "animate-spinOut"
                : "animate-spinOutBackward"
            }`}
          >
            <img
              src={previousDish.mainImage ?? ""}
              alt={previousDish.name ?? ""}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <div
          className={`absolute inset-0 ${
            previousDish
              ? scrollDirection === "forward"
                ? "animate-spinIn"
                : "animate-spinInBackward"
              : ""
          }`}
        >
          <img
            src={currentDish.mainImage ?? ""}
            alt={currentDish.name ?? ""}
            className={`absolute inset-0 w-full h-full ${
              currentDish.id == 33 || 34 || 28
                ? "object-contain"
                : "object-contain"
            }
              `}
          />
        </div>
      </div>
    </div>
  );
}

