"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OurStory() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll<HTMLElement>(".fade-in");

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

    // Optional: cleanup ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="h-[80vh] bg-[#2A332D]">
      {/* Story Section */}
      <section
        ref={sectionRef}
        className="max-w-7xl flex gap-5 flex-col items-center text-center text-[var(--muted)] mx-auto px-4 py-16 md:py-24"
      >
        <div className="flex flex-col gap-6 fade-in">
          <div className="flex items-center justify-around fade-in">
            <div className="bg-[var(--muted)] h-1 w-20"></div>
            <h1 className="text-5xl tracking-widest">Our Story</h1>
            <div className="bg-[var(--muted)] h-1 w-20"></div>
          </div>
          <h2 className="max-w-2xl text-sm fade-in">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.ea hic
            officiis architecto ducimus illo laboriosam. Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
          </h2>
        </div>
        <div className="image max-w-7xl flex gap-6">
          <div className="bg-[url('/images/image.jpg')] bg-center h-96 w-90 fade-in"></div>
          <div className="bg-[url('/images/forestBg.jpg')] h-96 w-40 fade-in"></div>
          <div className="bg-[url('/images/imag2.jpg')] bg-center h-96 w-90 fade-in"></div>
        </div>
      </section>
    </div>
  );
}
