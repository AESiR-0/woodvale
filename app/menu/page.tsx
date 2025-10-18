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

type CategoryType = "appetizers" | "entrees" | "drinks" | "wines" ;

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("appetizers");
  const [activeDish, setActiveDish] = useState<number>(1);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [showText, setShowText] = useState(true);
  const [displayedDish, setDisplayedDish] = useState<Dish | null>(null);
  const [previousDish, setPreviousDish] = useState<Dish | null>(null);
  const [scrollDirection, setScrollDirection] = useState<"forward" | "backward">("forward");
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isChangingCategory = useRef(false);
  const prevDishId = useRef<number>(1);
  const isManualNavigation = useRef(false);
  const categoryScrollDirection = useRef<'forward' | 'backward'>('forward');
  const lastScrollTop = useRef<number>(0);
  
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
      // Determine scroll direction
      const currentIndex = dishes.findIndex((d) => d.id === activeDish);
      const previousIndex = dishes.findIndex((d) => d.id === prevDishId.current);
      const direction = currentIndex > previousIndex ? "forward" : "backward";
      
      setScrollDirection(direction);

      // Hide text
      setShowText(false);

      // Set previous dish for exit animation
      setPreviousDish(displayedDish);

      // Small delay then update to new dish
      const timer = setTimeout(() => {
        setDisplayedDish(current);

        // Show text after animation
        setTimeout(() => {
          setShowText(true);
          setPreviousDish(null);
        }, 900);
      }, 0);

      prevDishId.current = activeDish;
      return () => clearTimeout(timer);
    }
  }, [activeDish, dishes, displayedDish]);

  // Reset active dish, scroll, and carousel when category changes
  useEffect(() => {
    setCarouselIndex(0); // Reset carousel to first page
    
    if (scrollContainerRef.current && dishes.length > 0) {
      // Disable smooth scrolling temporarily
      scrollContainerRef.current.style.scrollBehavior = "auto";
      
      // Position based on scroll direction
      if (categoryScrollDirection.current === 'backward') {
        // Going backward - position near the end to allow continued backward scrolling
        const lastDishIndex = dishes.length - 1;
        setActiveDish(dishes[lastDishIndex]?.id || 1);
        
        // Wait for DOM to update before positioning
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (scrollContainerRef.current) {
              const scrollHeight = scrollContainerRef.current.scrollHeight;
              const viewportHeight = scrollContainerRef.current.clientHeight;
              // Position near the end but not at absolute end (85% to avoid immediate forward trigger)
              const targetScroll = Math.max(0, (scrollHeight - viewportHeight) * 0.85);
              scrollContainerRef.current.scrollTop = targetScroll;
              lastScrollTop.current = targetScroll;
            }
          }, 30);
        });
      } else {
        // Going forward - position near the start to allow continued forward scrolling
        setActiveDish(dishes[0]?.id || 1);
        // Position slightly below 0 to avoid immediate backward trigger
        setTimeout(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 150;
            lastScrollTop.current = 150;
          }
        }, 10);
      }
      
      // Re-enable smooth scrolling and reset flag after positioning
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.style.scrollBehavior = "smooth";
        }
        setTimeout(() => {
          isChangingCategory.current = false;
        }, 100);
      }, 100);
    }
  }, [activeCategory, dishes]);

  // Handle scroll tracking
  useEffect(() => {
    let switchTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container || isChangingCategory.current || dishes.length === 0) return;

      setShowScrollHint(false);

      const scrollPosition = container.scrollTop + container.clientHeight / 2;
      const containerHeight = container.scrollHeight;
      const viewportHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const isScrollingUp = scrollTop < lastScrollTop.current;
      lastScrollTop.current = scrollTop;

      // Check if scrolled near the top - switch to previous category (infinite backward)
      if (scrollTop <= 100 && isScrollingUp && !isManualNavigation.current) {
        if (switchTimeout) {
          clearTimeout(switchTimeout);
        }

        switchTimeout = setTimeout(() => {
          if (isChangingCategory.current) return;

          isChangingCategory.current = true;
          categoryScrollDirection.current = 'backward';

          // Infinite loop backward
          if (activeCategory === "wines") {
            setActiveCategory("drinks");
          } else if (activeCategory === "drinks") {
            setActiveCategory("entrees");
          } else if (activeCategory === "entrees") {
            setActiveCategory("appetizers");
          } else if (activeCategory === "appetizers") {
            setActiveCategory("wines");
          }
        }, 150);

        return;
      }

      // Check if near the end - switch to next category (infinite forward)
      if (scrollTop + viewportHeight >= containerHeight - 200 && !isScrollingUp && !isManualNavigation.current) {
        if (switchTimeout) {
          clearTimeout(switchTimeout);
        }

        switchTimeout = setTimeout(() => {
          if (isChangingCategory.current) return;

          isChangingCategory.current = true;
          categoryScrollDirection.current = 'forward';

          // Infinite loop forward
          if (activeCategory === "appetizers") {
            setActiveCategory("entrees");
          } else if (activeCategory === "entrees") {
            setActiveCategory("drinks");
          } else if (activeCategory === "drinks") {
            setActiveCategory("wines");
          } else if (activeCategory === "wines") {
            setActiveCategory("appetizers");
          }
        }, 150);

        return;
      }

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
      // Set manual navigation flag to prevent auto category switching
      isManualNavigation.current = true;
      
      section.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Update carousel index to show the dish
      const dishIndex = dishes.findIndex((d) => d.id === dishId);
      if (dishIndex !== -1) {
        setCarouselIndex(Math.floor(dishIndex / DISHES_PER_VIEW));
      }
      
      // Clear the flag after scroll animation completes
      setTimeout(() => {
        isManualNavigation.current = false;
      }, 1000);
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
      // Navigate to the first dish of the previous page
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
      // Navigate to the first dish of the next page
      const targetDish = dishes[newIndex * DISHES_PER_VIEW];
      if (targetDish) {
        scrollToDish(targetDish.id);
      }
    }
  };

  const currentDish = displayedDish || (dishes.length > 0 ? dishes[0] : null);

  // Guard clause for loading state
  if (!currentDish) {
    return (
      <div className="flex h-screen bg-[var(--leaf)] text-[var(--bg)] items-center justify-center">
        <Navbar />
        <div className="text-2xl text-[var(--muted)]">Loading menu...</div>
      </div>
    );
  }

  // Animation classes for text
  const getTextAnimationClass = () => {
    return showText ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8";
  };

  return (
    <div className="flex h-screen bg-[var(--leaf)] text-[var(--bg)] overflow-hidden">
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Fixed Content Display Area */}
        <div className="flex-1 flex items-center justify-center px-8 pt-16 relative">
          <div className="max-w-6xl w-full relative z-10">
            {/* Title and Image Container */}
            <div className="flex flex-row-reverse items-center justify-center gap-18 mb-8">
              {/* Title - WITH ANIMATION */}
              <div
                className={`text-left transition-all duration-500 ease-out ${getTextAnimationClass()}`}
              >
                <h1 className="text-6xl font-light text-[var(--muted)] tracking-wide mb-4">
                  {currentDish.name}
                </h1>
                <h2 className="text-2xl font-bold text-[var(--muted)]">
                  {currentDish.subtitle}
                </h2>
                {currentDish.price && (
                  <p className="text-xl text-[var(--muted)]/80 mt-2">
                    ${currentDish.price}
                  </p>
                )}
              </div>

              {/* Image Container with absolute positioning for overlay */}
              <div className="relative w-80 h-80">
                {/* Previous Image - Animate based on scroll direction */}
                {previousDish && (
                  <div className={`absolute inset-0 bg-white rounded-full shadow-2xl ${
                    scrollDirection === "forward" ? "animate-spinOut" : "animate-spinOutBackward"
                  }`}>
                    <img
                      src={previousDish.mainImage}
                      alt={previousDish.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                )}

                {/* Current Image - Animate based on scroll direction */}
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

            {/* Dish Selector with Carousel */}
            <div className="flex justify-center items-center gap-4">
              <ChevronLeft
                className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                  carouselIndex > 0
                    ? "text-[var(--muted)] hover:text-[var(--muted)]/80 hover:scale-110"
                    : "text-[var(--muted)]/30 opacity-50 cursor-not-allowed"
                }`}
                onClick={handleCarouselPrev}
              />
              <div className="flex items-center justify-center gap-4 mt-10 w-3/4 h-50 overflow-hidden relative">
                <div 
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(0)` }}
                >
                  {visibleDishes.map((d, index) => (
                    <div
                      key={`selector-${activeCategory}-${d.id}`}
                      onClick={() => scrollToDish(d.id)}
                      className={`cursor-pointer w-1/4 h-40 flex flex-col items-center justify-center transition-all duration-300 ${
                        activeDish === d.id
                          ? "text-[var(--muted)] w-1/4 scale-110 px-4 pt-2 bg-white/20 rounded-4xl"
                          : "scale-90 opacity-60 hover:opacity-80 hover:scale-95"
                      }`}
                      style={{
                        animation: `fadeSlideIn 0.4s ease-out ${index * 0.1}s both`
                      }}
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
              </div>
              <ChevronRight
                className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                  carouselIndex < totalPages - 1
                    ? "text-[var(--muted)] hover:text-[var(--muted)]/80 hover:scale-110"
                    : "text-[var(--muted)]/30 opacity-50 cursor-not-allowed"
                }`}
                onClick={handleCarouselNext}
              />
            </div>
            
            {/* Carousel Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
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
                        ? "bg-[var(--muted)] w-8 h-2"
                        : "bg-[var(--muted)]/40 hover:bg-[var(--muted)]/60 w-2 h-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Invisible Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="absolute inset-0 overflow-y-scroll opacity-0 pointer-events-auto z-0"
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
        <div className="backdrop-blur-3xl px-8 py-6 flex justify-center gap-8 relative z-20">
          <button
            onClick={() => {
              if (activeCategory !== "appetizers") {
                categoryScrollDirection.current = 'forward';
                setActiveCategory("appetizers");
              }
            }}
            className={`py-3 px-6 rounded-full transition-all duration-300 text-lg font-semibold ${
              activeCategory === "appetizers"
                ? "bg-[var(--muted)] text-gray-700 scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Appetizers
          </button>
          <button
            onClick={() => {
              if (activeCategory !== "entrees") {
                categoryScrollDirection.current = 'forward';
                setActiveCategory("entrees");
              }
            }}
            className={`py-3 px-6 rounded-full transition-all duration-300 text-lg font-semibold ${
              activeCategory === "entrees"
                ? "bg-[var(--muted)] text-gray-700 scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Entrees
          </button>
          <button
            onClick={() => {
              if (activeCategory !== "drinks") {
                categoryScrollDirection.current = 'forward';
                setActiveCategory("drinks");
              }
            }}
            className={`py-3 px-6 rounded-full transition-all duration-300 text-lg font-semibold ${
              activeCategory === "drinks"
                ? "bg-[var(--muted)] text-gray-700 scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Drinks
          </button>
          <button
            onClick={() => {
              if (activeCategory !== "wines") {
                categoryScrollDirection.current = 'forward';
                setActiveCategory("wines");
              }
            }}
            className={`py-3 px-6 rounded-full transition-all duration-300 text-lg font-semibold ${
              activeCategory === "wines"
                ? "bg-[var(--muted)] text-gray-700 scale-110"
                : "bg-[var(--muted)]/60 text-gray-600 hover:bg-[var(--muted)]/40 hover:scale-105"
            }`}
          >
            Wines
          </button>
        </div>
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
          animation: spinOut 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-spinIn {
          animation: spinIn 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-spinOutBackward {
          animation: spinOutBackward 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-spinInBackward {
          animation: spinInBackward 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
}