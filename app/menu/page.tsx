"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { categories, Dish, CategoryType } from "@/utils/dishesData";
import TraditionalMenu from "@/components/TraditionalManu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DishDisplay from "@/components/menu/DishDisplay";
import DishSelector from "@/components/menu/DishSelector";
import CategoryNavigation from "@/components/menu/CategoryNavigation";
import MenuAnimations from "@/components/menu/MenuAnimations";

function FoodMenuContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("food");
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
  const isChangingCategory = useRef(false);
  const prevDishId = useRef<number>(1);
  const isManualNavigation = useRef(false);
  const categoryScrollDirection = useRef<"forward" | "backward">("forward");

  const DISHES_PER_VIEW = 4;

  const dishes: Dish[] = categories[activeCategory] || [];

  // Handle URL parameter for category
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && ["food", "entrees", "drinks", "cocktails", "brunch"].includes(categoryParam)) {
      setActiveCategory(categoryParam as CategoryType);
    }
  }, [searchParams]);

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

  return (
    <>
      <Navbar />

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-[var(--leaf)] to-[var(--leaf)]/90">

        {isTraditionalMenu ? (
          <div className="w-full flex-1">
            {/* Close button when traditional menu is open */}
            <button
              onClick={() => setIsTraditionalMenu(false)}
              className="fixed top-24 right-6 z-50 bg-[var(--mint)] hover:bg-[var(--mint)]/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Show Interactive Menu"
            >
              <X className="w-6 h-6" />
            </button>
            <TraditionalMenu />
          </div>
        ) : (
          <div className="flex flex-1 bg-gradient-to-br from-[var(--leaf)] to-[var(--leaf)]/90 text-[var(--bg)] relative pt-20 sm:pt-20 md:pt-0" style={{ minHeight: "calc(100vh - 200px)" }}>
            {/* Paper Scroll Button - At bottom right of menu container */}
            <button
              onClick={() => setIsTraditionalMenu(true)}
              className="paper-scroll-button absolute bottom-4 right-4 z-50 cursor-pointer"
              aria-label="Show Traditional Menu"
            >
              <div className="paper-scroll">
                <div className="scroll-content">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </button>
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative w-full">
              {/* Fixed Content Display Area */}
              <div
                ref={scrollContainerRef}
                className="flex-1 flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-3 md:py-4 relative select-none"
              >
                <div className="max-w-6xl w-full relative z-10 flex flex-col justify-center items-center h-full gap-6 sm:gap-4 md:gap-6 lg:gap-8">
                  <DishDisplay
                    currentDish={currentDish}
                    previousDish={previousDish}
                    scrollDirection={scrollDirection}
                    showText={showText}
                  />

                  <DishSelector
                    dishes={dishes}
                    visibleDishes={visibleDishes}
                    activeDish={activeDish}
                    carouselIndex={carouselIndex}
                    totalPages={totalPages}
                    onDishClick={scrollToDish}
                    onPrevClick={handleCarouselPrev}
                    onNextClick={handleCarouselNext}
                  />

                  <CategoryNavigation
                    activeCategory={activeCategory}
                    dishes={dishes}
                    carouselIndex={carouselIndex}
                    totalPages={totalPages}
                    DISHES_PER_VIEW={DISHES_PER_VIEW}
                    onCategoryChange={(cat) => {
                      categoryScrollDirection.current = "forward";
                      setActiveCategory(cat);
                    }}
                    onPageClick={(idx) => {
                      setCarouselIndex(idx);
                      const targetDish = dishes[idx * DISHES_PER_VIEW];
                      if (targetDish) {
                        scrollToDish(targetDish.id!);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <MenuAnimations />
      <Footer />
    </>
  );
}

export default function FoodMenu() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <FoodMenuContent />
    </Suspense>
  );
}
