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
}

type CategoryType = "food" | "drinks" | "reviews";

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("food");
  const [activeDish, setActiveDish] = useState<number>(1);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isChangingCategory = useRef(false);

  const dishes: Dish[] = categories[activeCategory];

  // Reset scroll hint timer
  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Reset active dish and scroll when category changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Disable smooth scrolling temporarily
      scrollContainerRef.current.style.scrollBehavior = "auto";
      scrollContainerRef.current.scrollTop = 0;
      // Re-enable smooth scrolling after reset
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.style.scrollBehavior = "smooth";
        }
      }, 50);
    }
    setActiveDish(dishes[0]?.id || 1);
    isChangingCategory.current = false;
  }, [activeCategory, dishes]);

  // Handle scroll tracking
  useEffect(() => {
    let switchTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container || isChangingCategory.current) return;

      setShowScrollHint(false);

      const scrollPosition = container.scrollTop + container.clientHeight / 2;
      const containerHeight = container.scrollHeight;
      const viewportHeight = container.clientHeight;
      const scrollTop = container.scrollTop;

      // Check if at the very end - switch category
      // Only trigger if we're truly at the bottom AND scrolling down
      if (scrollTop + viewportHeight >= containerHeight - 5) {
        // Clear any existing timeout
        if (switchTimeout) {
          clearTimeout(switchTimeout);
        }

        // Wait a bit to ensure user wants to continue scrolling
        switchTimeout = setTimeout(() => {
          if (isChangingCategory.current) return;

          isChangingCategory.current = true;

          if (activeCategory === "food") {
            setActiveCategory("drinks");
          } else if (activeCategory === "drinks") {
            setActiveCategory("food");
          }
        }, 300);

        return;
      }

      // Clear timeout if user scrolls back up
      if (switchTimeout) {
        clearTimeout(switchTimeout);
        switchTimeout = null;
      }

      // Normal scroll - update active dish
      for (let i = 0; i < dishes.length; i++) {
        const key = `${activeCategory}-${dishes[i].id}`;
        const section = sectionRefs.current[key];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            if (activeDish !== dishes[i].id) {
              setActiveDish(dishes[i].id);
            }
            break;
          }
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
        if (switchTimeout) {
          clearTimeout(switchTimeout);
        }
      };
    }
  }, [dishes, activeDish, activeCategory]);

  const scrollToDish = (dishId: number) => {
    const key = `${activeCategory}-${dishId}`;
    const section = sectionRefs.current[key];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const currentDish = dishes.find((d) => d.id === activeDish) || dishes[0];

  return (
    <div className="flex h-screen bg-[var(--leaf)] text-[var(--bg)] overflow-hidden">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Fixed Content Display Area */}
        <div className="flex-1 flex items-center justify-center px-8 pt-16 relative">
          <div className="max-w-6xl w-full">
            {/* Title and Image Container */}
            <div className="flex flex-row-reverse items-center justify-center gap-8 mb-8">
              {/* Title */}
              <div className="text-left">
                <h1 className="text-8xl font-light text-[var(--muted)] tracking-wide mb-4">
                  {currentDish.name}
                </h1>
                <h2 className="text-5xl font-bold text-[var(--muted)]">
                  {currentDish.subtitle}
                </h2>
              </div>

              {/* Image */}
              <div className="bg-white rounded-full shadow-2xl w-80 h-80">
                <img
                  src={currentDish.mainImage}
                  alt={currentDish.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Dish Selector */}
            <div className="flex justify-center items-center gap-4">
              <ChevronLeft
                className={`w-6 h-6 cursor-pointer transition ${
                  dishes.findIndex((d) => d.id === activeDish) > 0
                    ? "text-gray-400 hover:text-gray-600"
                    : "text-gray-300 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => {
                  const currentIndex = dishes.findIndex(
                    (d) => d.id === activeDish
                  );
                  if (currentIndex > 0) {
                    scrollToDish(dishes[currentIndex - 1].id);
                  }
                }}
              />
              <div className="flex gap-4">
                {dishes.map((d) => (
                  <div
                    key={`selector-${activeCategory}-${d.id}`}
                    onClick={() => scrollToDish(d.id)}
                    className={`cursor-pointer transition-all duration-300 ${
                      activeDish === d.id
                        ? "text-[var(--muted)] scale-110 h-40 px-4 pt-2 bg-white/20 rounded-2xl"
                        : "scale-90 opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="rounded-full overflow-hidden w-20 h-20 flex items-center justify-center">
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <p className="text-sm text-center mt-2">
                      {d.name.toLowerCase()}
                      <br />
                      {d.subtitle.toLowerCase()}
                    </p>
                  </div>
                ))}
              </div>
              <ChevronRight
                className={`w-6 h-6 cursor-pointer transition ${
                  dishes.findIndex((d) => d.id === activeDish) <
                  dishes.length - 1
                    ? "text-gray-400 hover:text-gray-600"
                    : "text-gray-300 opacity-50 cursor-not-allowed"
                }`}
                onClick={() => {
                  const currentIndex = dishes.findIndex(
                    (d) => d.id === activeDish
                  );
                  if (currentIndex < dishes.length - 1) {
                    scrollToDish(dishes[currentIndex + 1].id);
                  }
                }}
              />
            </div>
          </div>

          {/* Invisible Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="absolute inset-0 overflow-y-scroll opacity-0 pointer-events-auto"
          >
            {dishes.map((dish) => (
              <div
                key={`scroll-${activeCategory}-${dish.id}`}
                ref={(el) => {
                  sectionRefs.current[`${activeCategory}-${dish.id}`] = el;
                }}
                className="h-screen"
              />
            ))}
          </div>
        </div>

        {/* Scroll Hint */}
        <div
          className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-1000 ${
            showScrollHint ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <p className="text-[var(--muted)]/80 text-sm font-medium">
              Scroll to explore
            </p>
            <svg
              className="w-6 h-6 text-[var(--muted)]/80"
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

        {/* Bottom Navigation */}
        <div className="backdrop-blur-3xl px-8 py-6 flex justify-center gap-12 relative z-20">
          <button
            onClick={() => {
              if (activeCategory !== "food") {
                setActiveCategory("food");
              }
            }}
            className={`py-4 px-8 rounded-full transition-all duration-300 text-xl font-semibold ${
              activeCategory === "food"
                ? "bg-[var(--muted)] text-gray-700 scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Food
          </button>
          <button
            onClick={() => {
              if (activeCategory !== "drinks") {
                setActiveCategory("drinks");
              }
            }}
            className={`py-4 px-8 rounded-full transition-all duration-300 text-xl font-semibold ${
              activeCategory === "drinks"
                ? "bg-[var(--muted)] text-gray-700 scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Drinks
          </button>
        </div>
      </div>
    </div>
  );
}
