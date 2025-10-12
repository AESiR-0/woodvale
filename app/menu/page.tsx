"use client";
import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import { ChevronLeft, ChevronRight, Utensils, Wine } from "lucide-react";
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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const dishes: Dish[] = categories[activeCategory];

  useEffect(() => {
    setActiveDish(dishes[0].id);
  }, [activeCategory, dishes]);

  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollPosition = container.scrollTop + container.clientHeight / 2;

      for (let i = 0; i < dishes.length; i++) {
        const section = sectionRefs.current[dishes[i].id];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveDish(dishes[i].id);
            break;
          }
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [dishes]);

  const scrollToDish = (dishId: number) => {
    setActiveDish(dishId);
    const section = sectionRefs.current[dishId];
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
        <div className="flex-1 flex items-center justify-center px-8 relative">
          <div className="max-w-6xl w-full">
            {/* Title and Image Container */}
            <div className="flex flex-row-reverse items-center justify-center gap-8 mb-8">
              {/* Title */}
              <div className="text-left">
                <h1 className="text-8xl font-light  text-[var(--muted)] tracking-wide mb-4 transition-all duration-500">
                  {currentDish.name}
                </h1>
                <h2 className="text-5xl font-bold  text-[var(--muted)] transition-all duration-500">
                  {currentDish.subtitle}
                </h2>
              </div>

              {/* Image */}
              <div className="bg-white  rounded-full shadow-2xl transition-all duration-500 w-80 h-80 ">
                <img
                  src={currentDish.mainImage}
                  alt={currentDish.name}
                  className="w-full h-full object-cover rounded-full"
                  key={currentDish.id}
                />
              </div>
            </div>

            {/* Dish Selector */}
            <div className="flex justify-center items-center gap-4">
              <ChevronLeft
                className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 transition"
                onClick={() => {
                  const currentIndex = dishes.findIndex(
                    (d) => d.id === activeDish
                  );
                  const prevIndex =
                    currentIndex > 0 ? currentIndex - 1 : dishes.length - 1;
                  scrollToDish(dishes[prevIndex].id);
                }}
              />
              <div className="flex gap-4">
                {dishes.map((d) => (
                  <div
                    key={d.id}
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
                className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600 transition"
                onClick={() => {
                  const currentIndex = dishes.findIndex(
                    (d) => d.id === activeDish
                  );
                  const nextIndex =
                    currentIndex < dishes.length - 1 ? currentIndex + 1 : 0;
                  scrollToDish(dishes[nextIndex].id);
                }}
              />
            </div>
          </div>

          {/* Invisible Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="absolute inset-0  overflow-y-scroll opacity-0 pointer-events-auto"
            style={{ scrollBehavior: "smooth" }}
          >
            {dishes.map((dish) => (
              <div
                key={dish.id}
                ref={(el) => {
                  sectionRefs.current[dish.id] = el;
                }}
                className="h-screen"
              />
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white/20 backdrop-blur-3xl px-8 py-6 flex justify-center gap-12 relative z-20">
          <button
            onClick={() => setActiveCategory("food")}
            className={`py-6 px-6 rounded-full transition duration-400 ${
              activeCategory === "food"
                ? "bg-[var(--muted)] px-8"
                : "bg-[var(--muted)]/60 hover:bg-[var(--muted)]/40 "
            }`}
          >
            <Utensils className="w-8 h-10 text-gray-600" />
          </button>
          <button
            onClick={() => setActiveCategory("drinks")}
            className={`py-6 px-6 rounded-full transition duration-400 ${
              activeCategory === "drinks"
                ? "bg-[var(--muted)] px-8"
                : "bg-[var(--muted)]/60 hover:bg-[var(--muted)]/40"
            }`}
          >
            <Wine className="w-8 h-10 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
