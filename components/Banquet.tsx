"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Banquet() {
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
    <div className="relative min-h-screen  flex items-center bg-[#2A332D] overflow-hidden px-4">
      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.5)_100%)] z-10" />

      {/* Wrapper with centered max width */}
      <div className="max-w-6xl w-full text-left flex flex-col items-center gap-20 mx-auto">
          <div className="fade-in-section text-center w-full flex flex-col md:flex-row gap-6 items-center justify-center">
            {/* Left wavy line */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 10"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="w-24 h-6 text-white opacity-60 hidden md:block"
            >
              <path d="M0 5 C20 0, 40 10, 60 5 S100 10, 120 5" />
            </svg>

            {/* Heading */}
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-white text-center">
              Banquet Booking
            </h2>

            {/* Right wavy line */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 10"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="w-24 h-6 text-white opacity-60 hidden md:block"
            >
              <path d="M0 5 C20 10, 40 0, 60 5 S100 0, 120 5" />
            </svg>
          </div>
        <div className="flex items-center w-full">
          <div className="image w-full">
            <Image
              src="/images/image.jpg"
              width={600}
              height={600}
              alt="Picture of the author"
              style={{objectFit: "cover"}}
            />
          </div>
          {/* bg-[url('/images/image.jpg')] bg-center h-96 w-3/4 */}
          <div className="desc w-3/4 flex flex-col gap-4">
            {" "}
            <p className="text-2xl sm:text-3xl text-white/90 font-medium drop-shadow-md">
              Book your perfect banquet for weddings, birthdays, and special
              events.
            </p>
            <p className="text-lg sm:text-lg text-[var(--muted)] drop-shadow">
              Reference: Kindly reach out for customized decoration, menu
              options, and special event packages. Early booking ensures the
              best availability and personalized service.
            </p>
            <div>
              <Link href="/banquet" className="btn-primary">
                booking a private event?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// {/* Content container with GSAP scroll animation */}
//         <div
//           ref={containerRef}
//           className="relative z-20 text-left max-w-4xl flex flex-col items-start gap-8 px-8 mx-auto"
//           style={{ opacity: 0 }}
//         >
// <h1 className="text-6xl sm:text-7xl font-extrabold text-white drop-shadow-lg">
//   Banquet Booking
// </h1>
// <p className="text-2xl sm:text-3xl text-white/90 font-medium drop-shadow-md">
//   Book your perfect banquet for weddings, birthdays, and special events.
// </p>
// <p className="text-xl sm:text-2xl text-[var(--muted)] drop-shadow">
//   Reference: Kindly reach out for customized decoration, menu options,
//   and special event packages. Early booking ensures the best
//   availability and personalized service.
// </p>
// <div>
//   <Link href="/reserve" className="btn-primary">
//     Reserve a Table
//   </Link>
// </div>
//         </div>
