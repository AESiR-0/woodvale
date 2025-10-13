"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() { 
  const [scrollY, setScrollY] = useState(0);
  const welcomeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const classicRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        welcomeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.in" }
      );

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: "power3.in" }
      );

      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.in" }
      );

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: "power3.in" }
      );

      gsap.fromTo(
        classicRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.in" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--leaf)]">
        {/* Background Image with Overlay and Parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            willChange: "transform",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Elegant restaurant interior with warm lighting and tropical plants"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--leaf)]/90 via-[var(--leaf)]/80 to-[var(--leaf)]/95"></div>
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 text-left px-6 max-w-6xl mx-auto"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: 1 - scrollY / 800,
            willChange: "transform, opacity",
          }}
        >
          <p
            ref={welcomeRef}
            className="text-white text-sm uppercase tracking-widest font-medium mb-4"
          >
            Welcome to Woodvale
          </p>
          <h1
            ref={headingRef}
            className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
          >
            Savor the{" "}
            <span className="underline" ref={classicRef}>
              Classics
            </span>
            ,<br />
            Embrace the Present
          </h1>
          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-white/90 mb-8 mx-auto leading-relaxed"
          >
            Experience the perfect blend of speakeasy elegance and tropical
            ambiance. Where timeless flavors meet contemporary innovation.
          </p>
          <div ref={buttonRef}>
            <Link href="/reserve" className="btn-primary">
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
