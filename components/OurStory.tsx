"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OurStory() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const elements =
      sectionRef.current.querySelectorAll<HTMLElement>(".fade-in");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 20 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#2A332D] w-full px-4 sm:px-6 py-12 sm:py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8 items-center text-center">
        {/* Heading with wavy lines */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 fade-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 10"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="w-16 h-4 hidden md:block"
          >
            <path d="M0 5 C20 0, 40 10, 60 5 S100 10, 120 5" />
          </svg>

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Our Story
          </h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 10"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="w-16 h-4 hidden md:block"
          >
            <path d="M0 5 C20 10, 40 0, 60 5 S100 0, 120 5" />
          </svg>
        </div>

        {/* Story text */}
        <p className="fade-in max-w-2xl text-white/80 text-base sm:text-lg leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea hic
          officiis architecto ducimus illo laboriosam. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.
        </p>

        {/* Image gallery */}
        <div className="fade-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl">
          <div
            className="bg-center bg-cover sm:h-64 h-72 md:h-80 rounded-lg"
            style={{ backgroundImage: "url('/images/image.jpg')" }}
          />
          <div
            className="bg-center bg-cover sm:h-64 md:h-80 rounded-lg"
            style={{ backgroundImage: "url('/images/forestBg.jpg')" }}
          />
          <div
            className="bg-center bg-cover sm:h-64 md:h-80 rounded-lg"
            style={{ backgroundImage: "url('/images/imag2.jpg')" }}
          />
        </div>
      </div>
    </section>
  );
}
