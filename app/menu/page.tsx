"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image"; 
import gsap from "gsap";

interface SectionData {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  backgroundColor: string;
  accentColor: string;
}

const sectionsData: SectionData[] = [
  {
    id: "section-1",
    title: "SMOOTHIES FRAISE",
    description:
      "Fresh strawberry smoothie packed with vitamins and natural sweetness. Perfect for a healthy breakfast or post-workout refreshment.",
    mainImage: "/images/1C2AE5DD-CE4B-4B31-8B88-BD24EB05E4EC.PNG",
    backgroundColor: "#FFE5E5",
    accentColor: "#FF6B6B",
  },
  {
    id: "section-2",
    title: "TROPICAL PARADISE",
    description:
      "Escape to paradise with a tropical blend of mango, pineapple, and coconut water — a smooth escape in every sip.",
    mainImage: "/images/4C9B4FE7-B572-4112-ABFA-518ABA673536.PNG",
    backgroundColor: "#FFF7E5",
    accentColor: "#FFB347",
  },
  {
    id: "section-3",
    title: "GREEN ENERGY",
    description:
      "Supercharge your day with nutrient-dense greens, spirulina, and sweet fruits. Health never tasted this good.",
    mainImage: "/images/8490C6D5-8E95-458E-AAF9-1DADF2C4400D.PNG",
    backgroundColor: "#E5F5E5",
    accentColor: "#4CAF50",
  },
  {
    id: "section-4",
    title: "BERRY FUSION",
    description:
      "Antioxidant-rich blend of blueberries, raspberries, and blackberries. Pure berry goodness in every drop.",
    mainImage: "/images/34FA600C-5E4A-4A51-AC31-92AD9A2C86CE (1).PNG",
    backgroundColor: "#E5E5FF",
    accentColor: "#7B68EE",
  },
];

const FixedBackgroundSlideshow: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let lastScrollTime = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTime < 1000 || isAnimating) return;
      lastScrollTime = now;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 && currentSection < sectionsData.length - 1) {
          goToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }, 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      
      if ((e.key === "ArrowDown" || e.key === "PageDown") && currentSection < sectionsData.length - 1) {
        goToSection(currentSection + 1);
      } else if ((e.key === "ArrowUp" || e.key === "PageUp") && currentSection > 0) {
        goToSection(currentSection - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSection < sectionsData.length - 1) {
          goToSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, isAnimating]);

  const goToSection = (index: number) => {
    if (index === currentSection || isAnimating) return;
    setIsAnimating(true);

    const direction = index > currentSection ? 1 : -1;
    animateTransition(currentSection, index, direction);
  };

  const animateTransition = (fromIndex: number, toIndex: number, direction: number) => {
    const oldSection = contentRef.current?.children[fromIndex] as HTMLElement;
    const newSection = contentRef.current?.children[toIndex] as HTMLElement;

    if (!oldSection || !newSection) return;

    // Background color transition
    gsap.to(bgRef.current, {
      backgroundColor: sectionsData[toIndex].backgroundColor,
      duration: 0.8,
      ease: "power2.inOut",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSection(toIndex);
        setIsAnimating(false);
      },
    });

    // Animate out old content only (not the card)
    const oldMainImage = oldSection.querySelector(".main-image");
    const oldTitle = oldSection.querySelectorAll(".title-char");
    const oldDescription = oldSection.querySelector(".description");
    const oldButtons = oldSection.querySelector(".buttons");

    tl.to([oldMainImage, oldTitle, oldDescription, oldButtons], {
      opacity: 0,
      y: direction * -30,
      stagger: 0.02,
      duration: 0.4,
      ease: "power2.in",
    })
    .set(oldSection, { display: "none" });

    // Prepare new section content
    const newMainImage = newSection.querySelector(".main-image");
    const newTitle = newSection.querySelectorAll(".title-char");
    const newDescription = newSection.querySelector(".description");
    const newButtons = newSection.querySelector(".buttons");

    gsap.set(newSection, { display: "flex" });
    gsap.set(newMainImage, { opacity: 0, scale: 0.8, rotation: -10 });
    gsap.set(newTitle, { opacity: 0, y: 30 });
    gsap.set(newDescription, { opacity: 0, y: 20 });
    gsap.set(newButtons, { opacity: 0, y: 20 });

    // Animate in new content
    tl.to(newMainImage, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.8,
      ease: "back.out(1.2)",
    }, "-=0.2")
    .to(newTitle, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.4")
    .to(newDescription, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.3")
    .to(newButtons, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.3");
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Fixed Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full transition-colors duration-700"
        style={{ backgroundColor: sectionsData[0].backgroundColor }}
      />

      {/* Content Sections (Fixed, No Scroll) */}
      <div ref={contentRef} className="relative z-10 w-full h-full">
        {sectionsData.map((section, index) => (
          <div
            key={section.id}
            className="absolute inset-0 w-full h-full flex items-center justify-center p-4 md:p-8"
            style={{ display: index === 0 ? "flex" : "none" }}
          >
            <div className="section-card w-full h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="w-full h-full p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left Side - Text */}
                <div className="flex-1 space-y-6 z-10">
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-none">
                    {section.title.split("").map((char, i) => (
                      <span key={i} className="title-char inline-block">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </h1>
                  <p className="description text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                    {section.description}
                  </p>
                  <div className="buttons flex gap-4">
                    <button
                      className="cursor-pointer px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
                      style={{
                        backgroundColor: section.accentColor,
                        color: "white",
                      }}
                    >
                      Order Now
                    </button>
                    <button className="cursor-pointer px-8 py-4 border-2 border-gray-800 text-gray-800 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition-all">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="main-image relative w-full max-w-md aspect-square">
                    <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
                      <Image
                        src={section.mainImage}
                        alt={section.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Counter */}
      <div className="fixed bottom-8 right-8 z-50 text-gray-600 font-semibold">
        <span className="text-2xl">{currentSection + 1}</span>
        <span className="text-sm"> / {sectionsData.length}</span>
      </div>
    </div>
  );
};

export default FixedBackgroundSlideshow;