"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import TableBookingForm from "@/components/TableBookingForm";

gsap.registerPlugin(ScrollTrigger);

export default function ReservationForm() {
  const bgRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bgRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              markers: false,
            },
          }
        );
      }

      if (formRef.current) {
        // Ensure buttons are always visible
        const buttons = formRef.current.querySelectorAll("button");
        buttons.forEach((btn) => {
          gsap.set(btn, { opacity: 1, visibility: 'visible' });
        });
        
        gsap.from(formRef.current.querySelectorAll("h1, label, [role='combobox']"), {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            markers: false,
          },
        });
        
        // Animate buttons with fade-in but keep them visible and centered
        gsap.from(buttons, {
          opacity: 0.3,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            markers: false,
          },
        });
      }
    }, [bgRef, formRef]);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-4 sm:px-6">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-top will-change-transform"
        style={{
          backgroundImage: "url('/static/venue/banquet.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--leaf)]/70 via-[var(--leaf)]/70 to-[var(--leaf)]/70"></div>

      {/* Form with Glass Effect */}
      <div ref={formRef} className="relative flex justify-center items-center z-20 w-full">
        <TableBookingForm variant="glass" />
      </div>
    </section>
  );
}
