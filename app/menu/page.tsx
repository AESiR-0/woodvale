"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/utils/dishesData";
import Navbar from "@/components/Navbar";

interface Dish {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  mainImage: string;
  number: number;
  rating: number;
  chef: string;
  chefTitle: string;
  description: string;
  price?: number;
}

type CategoryType = "appetizers" | "entrees" | "drinks" | "wines";

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("appetizers");
  const [activeDish, setActiveDish] = useState<number>(1);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [showText, setShowText] = useState(true);
  const [displayedDish, setDisplayedDish] = useState<Dish | null>(null);
  const [previousDish, setPreviousDish] = useState<Dish | null>(null);
  const [scrollDirection, setScrollDirection] = useState<
    "forward" | "backward"
  >("forward");
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isChangingCategory = useRef(false);
  const prevDishId = useRef<number>(1);
  const isManualNavigation = useRef(false);
  const categoryScrollDirection = useRef<"forward" | "backward">("forward");
  const lastScrollTop = useRef<number>(0);
  const wheelAccumulator = useRef<number>(0);
  const lastWheelTime = useRef<number>(0);

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
        setActiveDish(dishes[dishes.length - 1]?.id || 1);
      } else {
        setActiveDish(dishes[0]?.id || 1);
      }
      isChangingCategory.current = false;
    }
  }, [activeCategory, dishes]);

  // Handle wheel scrolling on the main container
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isChangingCategory.current || dishes.length === 0) return;

      e.preventDefault();
      setShowScrollHint(false);

      const currentTime = Date.now();
      const timeDelta = currentTime - lastWheelTime.current;

      // Reset accumulator if too much time passed
      if (timeDelta > 200) {
        wheelAccumulator.current = 0;
      }

      lastWheelTime.current = currentTime;
      wheelAccumulator.current += e.deltaY;

      const SCROLL_THRESHOLD = 100;

      // Scrolling down (forward)
      if (wheelAccumulator.current > SCROLL_THRESHOLD) {
        wheelAccumulator.current = 0;
        const currentIndex = dishes.findIndex((d) => d.id === activeDish);

        if (currentIndex < dishes.length - 1) {
          // Move to next dish
          setActiveDish(dishes[currentIndex + 1].id);
        } else {
          // Move to next category
          isChangingCategory.current = true;
          categoryScrollDirection.current = "forward";

          if (activeCategory === "appetizers") {
            setActiveCategory("entrees");
          } else if (activeCategory === "entrees") {
            setActiveCategory("drinks");
          } else if (activeCategory === "drinks") {
            setActiveCategory("wines");
          } else if (activeCategory === "wines") {
            setActiveCategory("appetizers");
          }
        }
      }
      // Scrolling up (backward)
      else if (wheelAccumulator.current < -SCROLL_THRESHOLD) {
        wheelAccumulator.current = 0;
        const currentIndex = dishes.findIndex((d) => d.id === activeDish);

        if (currentIndex > 0) {
          // Move to previous dish
          setActiveDish(dishes[currentIndex - 1].id);
        } else {
          // Move to previous category
          isChangingCategory.current = true;
          categoryScrollDirection.current = "backward";

          if (activeCategory === "wines") {
            setActiveCategory("drinks");
          } else if (activeCategory === "drinks") {
            setActiveCategory("entrees");
          } else if (activeCategory === "entrees") {
            setActiveCategory("appetizers");
          } else if (activeCategory === "appetizers") {
            setActiveCategory("wines");
          }
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [dishes, activeDish, activeCategory]);

  // Handle touch swipes for mobile
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaY = touchEndY - touchStartY;
      const SCROLL_THRESHOLD = 50; // smaller threshold for touch
      if (Math.abs(deltaY) < SCROLL_THRESHOLD) return;

      if (isChangingCategory.current || dishes.length === 0) return;

      setShowScrollHint(false);

      // Swipe up → forward
      if (deltaY < -SCROLL_THRESHOLD) {
        const currentIndex = dishes.findIndex((d) => d.id === activeDish);

        if (currentIndex < dishes.length - 1) {
          setActiveDish(dishes[currentIndex + 1].id);
        } else {
          isChangingCategory.current = true;
          categoryScrollDirection.current = "forward";

          if (activeCategory === "appetizers") setActiveCategory("entrees");
          else if (activeCategory === "entrees") setActiveCategory("drinks");
          else if (activeCategory === "drinks") setActiveCategory("wines");
          else if (activeCategory === "wines") setActiveCategory("appetizers");
        }
      }
      // Swipe down → backward
      else if (deltaY > SCROLL_THRESHOLD) {
        const currentIndex = dishes.findIndex((d) => d.id === activeDish);

        if (currentIndex > 0) {
          setActiveDish(dishes[currentIndex - 1].id);
        } else {
          isChangingCategory.current = true;
          categoryScrollDirection.current = "backward";

          if (activeCategory === "wines") setActiveCategory("drinks");
          else if (activeCategory === "drinks") setActiveCategory("entrees");
          else if (activeCategory === "entrees")
            setActiveCategory("appetizers");
          else if (activeCategory === "appetizers") setActiveCategory("wines");
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [dishes, activeDish, activeCategory]);

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
        scrollToDish(targetDish.id);
      }
    }
  };

  const handleCarouselNext = () => {
    if (carouselIndex < totalPages - 1) {
      const newIndex = carouselIndex + 1;
      setCarouselIndex(newIndex);
      const targetDish = dishes[newIndex * DISHES_PER_VIEW];
      if (targetDish) {
        scrollToDish(targetDish.id);
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

  return (
    <div className="flex h-screen bg-[var(--leaf)] text-[var(--bg)] overflow-hidden">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Fixed Content Display Area - Compact Layout */}
        <div
          ref={scrollContainerRef}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6 relative overflow-hidden touch-none select-none"
        >
          <div className="max-w-6xl w-full relative z-10 flex flex-col justify-center items-center h-full gap-8 sm:gap-10 md:gap-12">
            {/* Title and Image Container - Compact */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-4 md:gap-8 lg:gap-12 mb-4 md:mb-6">
              {/* Title - WITH ANIMATION */}
              <div
                className={`text-center md:text-left transition-all duration-500 ease-out ${getTextAnimationClass()}`}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[var(--muted)] tracking-wide mb-1 md:mb-2">
                  {currentDish.name}
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[var(--muted)]">
                  {currentDish.subtitle}
                </h2>
                {currentDish.price && (
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--muted)]/80 mt-1">
                    ${currentDish.price}
                  </p>
                )}
              </div>

              {/* Image Container - Compact */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 flex-shrink-0">
                {previousDish && (
                  <div
                    className={`absolute inset-0 bg-white rounded-full shadow-2xl ${
                      scrollDirection === "forward"
                        ? "animate-spinOut"
                        : "animate-spinOutBackward"
                    }`}
                  >
                    <img
                      src={previousDish.mainImage}
                      alt={previousDish.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                )}

                <div
                  className={`absolute inset-0 bg-white rounded-full shadow-2xl ${
                    previousDish
                      ? scrollDirection === "forward"
                        ? "animate-spinIn"
                        : "animate-spinInBackward"
                      : ""
                  }`}
                >
                  <img
                    src={currentDish.mainImage}
                    alt={currentDish.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Dish Selector with Carousel - Compact */}
            <div className="flex justify-center items-center gap-2 sm:gap-3">
              <ChevronLeft
                className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                  carouselIndex > 0
                    ? "text-[var(--muted)] hover:text-[var(--muted)]/80 hover:scale-110"
                    : "text-[var(--muted)]/30 opacity-50 cursor-not-allowed"
                }`}
                onClick={handleCarouselPrev}
              />
              <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-3/4 h-24 sm:h-28 md:h-32 overflow-hidden relative">
                <div className="flex gap-2 sm:gap-3 transition-transform duration-500 ease-out">
                  {visibleDishes.map((d, index) => (
                    <div
                      key={`selector-${activeCategory}-${d.id}`}
                      onClick={() => scrollToDish(d.id)}
                      className={`cursor-pointer w-1/4 min-w-[55px] sm:min-w-[70px] h-20 sm:h-24 md:h-28 flex flex-col items-center justify-center transition-all duration-300 ${
                        activeDish === d.id
                          ? "text-[var(--muted)] scale-105 sm:scale-110 px-1.5 sm:px-3 pt-1 bg-white/20 rounded-xl sm:rounded-2xl"
                          : "scale-90 opacity-60 hover:opacity-80 hover:scale-95"
                      }`}
                      style={{
                        animation: `fadeSlideIn 0.4s ease-out ${
                          index * 0.1
                        }s both`,
                      }}
                    >
                      <div className="rounded-full overflow-hidden w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center">
                        <img
                          src={d.image}
                          alt={d.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-center mt-0.5 sm:mt-1 px-0.5 leading-tight">
                        {d.name.toLowerCase()}
                        <br />
                        {d.subtitle.toLowerCase()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 cursor-pointer transition-all duration-200 flex-shrink-0 ${
                  carouselIndex < totalPages - 1
                    ? "text-[var(--muted)] hover:text-[var(--muted)]/80 hover:scale-110"
                    : "text-[var(--muted)]/30 opacity-50 cursor-not-allowed"
                }`}
                onClick={handleCarouselNext}
              />
            </div>

            {/* Carousel Pagination Dots - Compact */}
            {totalPages > 1 && (
              <div className="flex justify-center flex-col gap-1.5 mt-3 sm:mt-4">
                <div className="flex justify-center gap-1.5 mt-4 mb-4 sm:mt-4">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCarouselIndex(idx);
                        const targetDish = dishes[idx * DISHES_PER_VIEW];
                        if (targetDish) {
                          scrollToDish(targetDish.id);
                        }
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        idx === carouselIndex
                          ? "bg-[var(--muted)] w-5 sm:w-6 h-1.5"
                          : "bg-[var(--muted)]/40 hover:bg-[var(--muted)]/60 w-1.5 h-1.5"
                      }`}
                    />
                  ))}
                </div>
<div className="backdrop-blur-3xl px-2 sm:px-4 md:px-6 py-3 sm:py-4 flex justify-center gap-2 sm:gap-3 md:gap-6 relative z-20 overflow-x-auto mb-4 sm:mb-6 scrollbar-hide">
  {["appetizers", "entrees", "drinks", "wines"].map((cat) => (
    <button
      key={cat}
      onClick={() => {
        if (activeCategory !== cat) {
          categoryScrollDirection.current = "forward";
          setActiveCategory(cat as CategoryType);
        }
      }}
      className={`flex-shrink-0 py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap ${
        activeCategory === cat
          ? "bg-[var(--muted)] text-gray-700 scale-105 sm:scale-110"
          : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
      }`}
    >
      {cat.charAt(0).toUpperCase() + cat.slice(1)}
    </button>
  ))}
</div>

              </div>
            )}
          </div>
        </div>

        {/* Scroll Hint */}
        <div
          className={`absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-1000 ${
            showScrollHint ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center gap-1.5 animate-bounce">
            <p className="text-[var(--muted)]/80 text-xs sm:text-sm font-medium">
              Scroll to explore
            </p>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--muted)]/80"
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

        {/* Bottom Navigation - Compact */}
        {/* <div className="backdrop-blur-3xl px-3 sm:px-6 md:px-8 sm:py-4 flex justify-center gap-2 sm:gap-3 md:gap-6 relative z-20 overflow-x-auto mb-6 sm:mb-8 md:mb-10">
          <button
            onClick={() => {
              if (activeCategory !== "appetizers") {
                categoryScrollDirection.current = "forward";
                setActiveCategory("appetizers");
              }
            }}
            className={`py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap ${
              activeCategory === "appetizers"
                ? "bg-[var(--muted)] text-gray-700 scale-105 sm:scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Appetizers
          </button>
          <button
            onClick={() => {
              if (activeCategory !== "entrees") {
                categoryScrollDirection.current = "forward";
                setActiveCategory("entrees");
              }
            }}
            className={`py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap ${
              activeCategory === "entrees"
                ? "bg-[var(--muted)] text-gray-700 scale-105 sm:scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Entrees
          </button>
          <button
            onClick={() => {
              if (activeCategory !== "drinks") {
                categoryScrollDirection.current = "forward";
                setActiveCategory("drinks");
              }
            }}
            className={`py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap ${
              activeCategory === "drinks"
                ? "bg-[var(--muted)] text-gray-700 scale-105 sm:scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Drinks
          </button>
          <button
            onClick={() => {
              if (activeCategory !== "wines") {
                categoryScrollDirection.current = "forward";
                setActiveCategory("wines");
              }
            }}
            className={`py-1.5 sm:py-2 px-3 sm:px-4 md:px-5 rounded-full transition-all duration-300 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap ${
              activeCategory === "wines"
                ? "bg-[var(--muted)] text-gray-700 scale-105 sm:scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Wines
          </button>
        </div> */}
      </div>

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
      `}</style>
    </div>
  );
}
