"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventBooking() {
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
          start: "top 80%",  // when top of element hits 80% of viewport height
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
      <div className="max-w-6xl w-full text-leftmx-auto">
        {/* Content container with GSAP scroll animation */}
        <div
          ref={containerRef}
          className="relative z-20 text-left max-w-4xl flex flex-col items-start gap-8 px-8 mx-auto"
          style={{ opacity: 0 }}
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold text-white drop-shadow-lg">
            Banquet Booking
          </h1>
          <p className="text-2xl sm:text-3xl text-white/90 font-medium drop-shadow-md">
            Book your perfect banquet for weddings, birthdays, and special events.
          </p>
          <p className="text-xl sm:text-2xl text-[var(--muted)] drop-shadow">
            Reference: Kindly reach out for customized decoration, menu options,
            and special event packages. Early booking ensures the best
            availability and personalized service.
          </p>
          <Link href="/banquet" passHref>
            <div>
              <Link href="/reserve" className="btn-primary">
                Reserve a Table
              </Link>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
