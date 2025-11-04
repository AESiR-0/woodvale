"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function FeelOrder() {
  const containerRef = useRef(null);

  useEffect(() => {
    const element = containerRef.current;

    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%", // when top of element hits 80% of viewport height
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
<div className="relative min-h-screen flex items-center bg-no-repeat bg-[url('/static/venue/IMG_6627.CR2')] bg-bottom bg-cover text-[var(--muted)] overflow-hidden px-4">
  {/* Vignette overlay */}
  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_10%,rgba(0,0,0,0.5)_100%)] z-10" />

  {/* Wrapper with centered max width */}
  <div className="max-w-6xl h-full w-full flex flex-col items-center mx-auto">
    <div className="h-full flex flex-col gap-12 md:gap-16 lg:gap-20 text-center justify-center">
      {/* Heading */}
      <p className="capitalize text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tighter leading-snug">
        Thinking about <span className="underline">dining in</span> this evening?
      </p>

      {/* Button / Link */}
      <div>
        <Link
          href="/reserve"
          className="save-seat-link relative inline-block text-lg sm:text-xl md:text-2xl px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 overflow-hidden rounded-md"
        >
          Save Your Seat
        </Link>
      </div>

      {/* Underline hover effect */}
      <style jsx global>{`
        .save-seat-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--muted);
          transform: scaleX(1);
          transform-origin: left;
          transition: transform 0.4s ease-in-out;
        }

        .save-seat-link:hover::after {
          transform: scaleX(0);
        }
      `}</style>
    </div>
  </div>
</div>

  );
}
