"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Grid3X3, ScrollText } from "lucide-react";
import { categories, Dish } from "@/utils/dishesData";
import TraditionalMenu from "@/components/TraditionalManu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageFlip from "@/components/PageFlip";

type CategoryType = "food" | "cocktails";

export default function FoodMenu() {
    const [showFlip, setShowFlip] = useState(false);

  const [activeCategory, setActiveCategory] = useState<CategoryType>("food");
  const [activeDish, setActiveDish] = useState<number>(1);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [showText, setShowText] = useState(true);
  const [displayedDish, setDisplayedDish] = useState<Dish | null>(null);
  const [previousDish, setPreviousDish] = useState<Dish | null>(null);
  const [scrollDirection, setScrollDirection] = useState<
    "forward" | "backward"
  >("forward");
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isTraditionalMenu, setIsTraditionalMenu] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isChangingCategory = useRef(false);
  const prevDishId = useRef<number>(1);
  const isManualNavigation = useRef(false);
  const categoryScrollDirection = useRef<"forward" | "backward">("forward");
  // const lastScrollTop = useRef<number>(0);
  // const wheelAccumulator = useRef<number>(0);
  // const lastWheelTime = useRef<number>(0);

  const DISHES_PER_VIEW = 4;

  const dishes: Dish[] = categories[activeCategory] || [];

  // Initialize displayed dish
  useEffect(() => {
    if (dishes.length === 0) return;
    const current = dishes.find((d) => d.id === activeDish) || dishes[0];
    if (!displayedDish) {
      setDisplayedDish(current);
    }
  }, [dishes, activeDish, displayedDish]);

  // Reset scroll hint timer
  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Animate dish changes
  useEffect(() => {
    if (dishes.length === 0) return;
    const current = dishes.find((d) => d.id === activeDish) || dishes[0];

    if (prevDishId.current !== activeDish && displayedDish) {
      const currentIndex = dishes.findIndex((d) => d.id === activeDish);
      const previousIndex = dishes.findIndex(
        (d) => d.id === prevDishId.current
      );
      const direction = currentIndex > previousIndex ? "forward" : "backward";

      setScrollDirection(direction);
      setShowText(false);
      setPreviousDish(displayedDish);

      const timer = setTimeout(() => {
        setDisplayedDish(current);
        setTimeout(() => {
          setShowText(true);
          setPreviousDish(null);
        }, 700);
      }, 0);

      prevDishId.current = activeDish;
      return () => clearTimeout(timer);
    }
  }, [activeDish, dishes, displayedDish]);

  // Reset active dish when category changes
  useEffect(() => {
    setCarouselIndex(0);
    if (dishes.length > 0) {
      if (categoryScrollDirection.current === "backward") {
        setActiveDish(dishes[dishes.length - 1]?.id ?? 1);
      } else {
        setActiveDish(dishes[0]?.id ?? 1);
      }
      isChangingCategory.current = false;
    }
  }, [activeCategory, dishes]);

  // Handle keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isChangingCategory.current || dishes.length === 0) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        handleNextDish();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevDish();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dishes, activeDish, activeCategory]);

  const handleNextDish = () => {
    setShowScrollHint(false);
    const currentIndex = dishes.findIndex((d) => d.id === activeDish);

    if (currentIndex < dishes.length - 1) {
      setActiveDish(dishes[currentIndex + 1].id!);
    } else {
      // Infinite scrolling: wrap to the other category
      isChangingCategory.current = true;
      categoryScrollDirection.current = "forward";
      setActiveCategory(activeCategory === "food" ? "cocktails" : "food");
    }
  };

  const handlePrevDish = () => {
    setShowScrollHint(false);
    const currentIndex = dishes.findIndex((d) => d.id === activeDish);

    if (currentIndex > 0) {
      setActiveDish(dishes[currentIndex - 1].id!);
    } else {
      // Infinite scrolling: wrap to the other category
      isChangingCategory.current = true;
      categoryScrollDirection.current = "backward";
      setActiveCategory(activeCategory === "cocktails" ? "food" : "cocktails");
    }
  };

  const scrollToDish = (dishId: number) => {
    setActiveDish(dishId);
    const dishIndex = dishes.findIndex((d) => d.id === dishId);
    if (dishIndex !== -1) {
      setCarouselIndex(Math.floor(dishIndex / DISHES_PER_VIEW));
    }
  };

  // Auto-update carousel when active dish changes
  useEffect(() => {
    const dishIndex = dishes.findIndex((d) => d.id === activeDish);
    if (dishIndex !== -1) {
      const targetPage = Math.floor(dishIndex / DISHES_PER_VIEW);
      if (targetPage !== carouselIndex) {
        setCarouselIndex(targetPage);
      }
    }
  }, [activeDish, dishes, carouselIndex]);

  const visibleDishes = dishes.slice(
    carouselIndex * DISHES_PER_VIEW,
    (carouselIndex + 1) * DISHES_PER_VIEW
  );
  const totalPages = Math.ceil(dishes.length / DISHES_PER_VIEW);

  const handleCarouselPrev = () => {
    if (carouselIndex > 0) {
      const newIndex = carouselIndex - 1;
      setCarouselIndex(newIndex);
      const targetDish = dishes[newIndex * DISHES_PER_VIEW];
      if (targetDish) {
        scrollToDish(targetDish.id!);
      }
    }
  };

  const handleCarouselNext = () => {
    if (carouselIndex < totalPages - 1) {
      const newIndex = carouselIndex + 1;
      setCarouselIndex(newIndex);
      const targetDish = dishes[newIndex * DISHES_PER_VIEW];
      if (targetDish) {
        scrollToDish(targetDish.id!);
      }
    }
  };

  const currentDish = displayedDish || (dishes.length > 0 ? dishes[0] : null);

  if (!currentDish) {
    return (
      <div className="flex h-screen bg-[var(--leaf)] text-[var(--bg)] items-center justify-center">
        <Navbar />
        <div className="text-2xl text-[var(--muted)]">Loading menu...</div>
      </div>
    );
  }

  const getTextAnimationClass = () => {
    return showText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8";
  };

  const currentIndex = dishes.findIndex((d) => d.id === activeDish);
  const isFirstDish = currentIndex === 0 && activeCategory === "food";
  const isLastDish =
    currentIndex === dishes.length - 1 && activeCategory === "cocktails";

  return (
    <div className="min-h-screen bg-[#E6E8D9]">
      <Navbar />

      {/* Toggle Button - Fixed Position
        <button
        onClick={() => setIsTraditionalMenu(!isTraditionalMenu)}
        className="fixed bottom-6 right-6 z-50 bg-[var(--mint)] hover:bg-[var(--mint)]/80 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label={
          isTraditionalMenu
            ? "Switch to Interactive Menu"
            : "Switch to Traditional Menu"
        }
      >
         {isTraditionalMenu ? (
           <Grid3X3 className="w-8 h-8" />
         ) : (
           <ScrollText className="w-8 h-8" />
         )}
      </button> */}

      {/* {!isTraditionalMenu ? ( */}
      <div className="flex h-screen bg-linear-to-br from-[var(--leaf)] to-[var(--leaf)]/92 text-[var(--bg)] overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative">
          {/* Fixed Content Display Area */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-3 md:py-4 relative overflow-hidden select-none"
          >
            <div className="max-w-6xl w-full relative z-10 flex flex-col justify-center items-center h-full gap-6 sm:gap-4 md:gap-6 lg:gap-8">
              {/* Title and Image Container */}
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

                  {/* Show description only for cocktails */}
                  {currentDish.subtitle === "Cocktail" &&
                    currentDish.description && (
                      <p className="text-sm sm:text-base md:text-base lg:text-md text-[var(--muted)]/70 mt-8 leading-relaxed max-w-md mx-auto md:mx-0">
                        {currentDish.description}
                      </p>
                    )}
                </div>

                {/* Image Container */}
                <div
                  className={`relative flex-shrink-0
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
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Dish Selector with Carousel */}
              <div className="flex justify-center items-center gap-3 sm:gap-2 md:gap-0 lg:gap-0 w-full flex-shrink-0">
                {/* <ChevronLeft
                    className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                      carouselIndex > 0
                        ? "text-[var(--muted)] hover:text-[var(--muted)]/80 hover:scale-110"
                        : "text-[var(--muted)]/30 opacity-50 cursor-not-allowed"
                    }`}
                    onClick={handleCarouselPrev}
                  /> */}
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 flex-1 h-24 sm:h-28 md:h-32 overflow-hidden">
                  <div className="flex gap-1.5 sm:gap-2 md:gap-3 transition-transform duration-500 ease-out">
                    {visibleDishes.map((d, index) => (
                      <div
                        key={`selector-${activeCategory}-${d.id ?? index}`}
                        onClick={() => scrollToDish(d.id!)}
                        className={`cursor-pointer flex-1 min-w-0 h-full flex flex-col items-center justify-center transition-all duration-300 ${
                          activeDish === d.id
                            ? "text-[var(--muted)] scale-100 sm:scale-105 px-1 sm:px-2 pt-1 bg-white/20 rounded-lg sm:rounded-xl"
                            : "scale-90 opacity-60 hover:opacity-80 hover:scale-95"
                        }`}
                        style={{
                          animation: `fadeSlideIn 0.4s ease-out ${
                            index * 0.1
                          }s both`,
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
                {/* <ChevronRight
                    className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                      carouselIndex < totalPages - 1
                        ? "text-[var(--muted)] hover:text-[var(--muted)]/80 hover:scale-110"
                        : "text-[var(--muted)]/30 opacity-50 cursor-not-allowed"
                    }`}
                    onClick={handleCarouselNext}
                  /> */}
              </div>

              {/* Navigation Buttons and Category */}
              <div className="flex flex-col gap-4 z-11 sm:gap-3 w-full flex-shrink-0">
                {/* Previous/Next Navigation Buttons */}
                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={handlePrevDish}
                    // disabled={isFirstDish}
                    className={
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-white"
                    }
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-semibold">Previous</span>
                  </button>

                  <button
                    onClick={handleNextDish}
                    // disabled={isLastDish}
                    className={
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-white"
                    }
                  >
                    <span className="text-sm font-semibold">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Buttons */}
                <div className="backdrop-blur-3xl px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 flex justify-center gap-1.5 sm:gap-2 md:gap-3 overflow-x-auto scrollbar-hide rounded-full">
                  {[
                    { key: "food", label: "Food" },
                    { key: "cocktails", label: "Cocktails" },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (activeCategory !== key) {
                          categoryScrollDirection.current = "forward";
                          setActiveCategory(key as CategoryType);
                        }
                      }}
                      className={`flex-shrink-0 py-1 sm:py-1.5 px-2.5 sm:px-3 md:px-4 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap ${
                        activeCategory === key
                          ? "bg-[var(--muted)] text-gray-700 scale-100 sm:scale-105"
                          : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Hint */}
          <div
            className={`absolute bottom-20 sm:bottom-24 md:bottom-28 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-1000 ${
              showScrollHint ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 animate-bounce">
              <p className="text-[var(--muted)]/80 text-xs sm:text-sm font-medium">
                Use arrows to navigate
              </p>
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[var(--muted)]/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* // ) : (
      //   <TraditionalMenu />
      // )} */}

      {!showFlip ? (
        <button
          onClick={() => setShowFlip(true)}
          className="absolute inset-0 bg-[var(--leaf)] z-[5] overflow-y-auto no-scrollbar rounded-tl-3xl shadow-2xl flex flex-col items-center justify-start backface-hidden"
        >
          Peek To Seek
        </button>
      ) : (
        <PageFlip isTraditionalMenu={true} />
      )}
      <Footer />

      {/* Keyframe Animations */}
      <style jsx global>{`
        @keyframes spinOut {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          20% {
            opacity: 0;
          }
          100% {
            transform: translate(-500%, 80%) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes spinIn {
          0% {
            transform: translate(120%, -200%) scale(0.7);
            opacity: 0;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }

        @keyframes spinOutBackward {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          20% {
            opacity: 0;
          }
          100% {
            transform: translate(120%, -200%) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes spinInBackward {
          0% {
            transform: translate(-500%, 80%) scale(0.8);
            opacity: 0;
          }
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-spinOut {
          animation: spinOut 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-spinIn {
          animation: spinIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-spinOutBackward {
          animation: spinOutBackward 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .animate-spinInBackward {
          animation: spinInBackward 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            forwards;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
