"use client";

import React, { useRef, useEffect, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Errors {
  name?: string;
  person?: string;
  timing?: string;
  date?: string;
}

export default function ReservationForm() {
  const bgRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [person, setPerson] = useState("");
  const [timing, setTiming] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!person.trim()) newErrors.person = "Number of persons is required";
    if (!timing.trim()) newErrors.timing = "Timing is required";
    if (!date.trim()) newErrors.date = "Date is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`Reservation confirmed!\n
      Name: ${name}\n
      Persons: ${person}\n
      Timing: ${timing}\n
      Date: ${date}`);
      setName("");
      setPerson("");
      setTiming("");
      setDate("");
    }
  };

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
        gsap.from(formRef.current.querySelectorAll("input, h1"), {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            markers: false,
          },
        });

        gsap.from(formRef.current.querySelectorAll("button"), {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
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
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative z-20 text-white rounded-lg shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 md:gap-6 text-base sm:text-lg"
      >
        <h1 className="font-heading text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-2 sm:mb-4">
          Book Your Table
        </h1>

        {/* First Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full text-[var(--muted)] placeholder:text-[var(--muted)] text-base sm:text-lg py-3 sm:py-4 px-3 sm:px-4 rounded-md border focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              min="1"
              placeholder="Persons"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className={`w-full text-[var(--muted)] placeholder:text-[var(--muted)] text-base sm:text-lg py-3 sm:py-4 px-3 sm:px-4 rounded-md border focus:outline-none ${
                errors.person ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.person && (
              <p className="text-red-400 text-sm mt-1">{errors.person}</p>
            )}
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <input
              type="time"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              className={`w-full text-[var(--muted)] placeholder:text-[var(--muted)] text-base sm:text-lg py-3 sm:py-4 px-3 sm:px-4 rounded-md border focus:outline-none ${
                errors.timing ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.timing && (
              <p className="text-red-400 text-sm mt-1">{errors.timing}</p>
            )}
          </div>
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full text-[var(--muted)] placeholder:text-[var(--muted)] text-base sm:text-lg py-3 sm:py-4 px-3 sm:px-4 rounded-md border focus:outline-none ${
                errors.date ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.date && (
              <p className="text-red-400 text-sm mt-1">{errors.date}</p>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="w-full mt-2 sm:mt-4">
          <Button
            type="submit"
            className="w-full text-[var(--muted)] font-semibold text-lg sm:text-xl py-4 sm:py-6 rounded-md"
          >
            Submit Reservation
          </Button>
        </div>
      </form>
    </section>
  );
}
