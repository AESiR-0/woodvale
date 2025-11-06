"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Banquet() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade in from top
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Image slide in from left and out
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Description slide in from right and out
      gsap.fromTo(
        descRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-[#2A332D] overflow-hidden px-4 py-12 md:py-20"
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.5)_100%)] z-10" />

      {/* Wrapper with centered max width */}
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center gap-12 md:gap-20 relative z-20">
        {/* Heading Section */}
        <div
          ref={headingRef}
          className="text-center w-full flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center"
        >
          {/* Left wavy line */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 10"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="w-16 md:w-24 h-4 md:h-6 text-white opacity-60 hidden sm:block"
          >
            <path d="M0 5 C20 0, 40 10, 60 5 S100 10, 120 5" />
          </svg>

          {/* Heading */}
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
            Banquet Booking
          </h2>

          {/* Right wavy line */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 10"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="w-16 md:w-24 h-4 md:h-6 text-white opacity-60 hidden sm:block"
          >
            <path d="M0 5 C20 10, 40 0, 60 5 S100 0, 120 5" />
          </svg>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 w-full">
          {/* Image - Hidden below md */}
          <div ref={imageRef} className="hidden md:block w-full lg:w-1/2">
            <Image
              src="/images/image.jpg"
              width={600}
              height={600}
              alt="Banquet hall interior"
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
            />
          </div>

          {/* Description */}
          <div
            ref={descRef}
            className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 items-center md:items-start text-center md:text-left"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium drop-shadow-md leading-relaxed">
              Book your perfect banquet for weddings, birthdays, and special
              events.
            </p>
            <p className="text-lg sm:text-xl text-white/70 drop-shadow leading-relaxed">
              Kindly reach out for customized decoration, menu
              options, and special event packages. Early booking ensures the
              best availability and personalized service.
            </p>
            <div className="mt-2 w-full flex justify-center">
              <Link
                href="/banquet"
                className="inline-block btn-primary px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
              >
                Booking a private event?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
