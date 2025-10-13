"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LeafScrollLanding() {
  const leftLeafRef = useRef<HTMLDivElement>(null);
  const rightLeafRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftLeaf = leftLeafRef.current;
    const rightLeaf = rightLeafRef.current;
    const content = contentRef.current;

    if (!leftLeaf || !rightLeaf || !content) return;

    // 🌿 Scroll-based animation for main leaves (keep this)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: content,
        start: "-40% center",
        end: "bottom center",
        scrub: true,
        // markers: true
      },
    });

    tl.to(
      leftLeaf,
      { x: "100vw", opacity: 0, rotate: -15, ease: "power2.inOut" },
      0
    );
    tl.to(
      rightLeaf,
      { x: "-100vw", opacity: 0, rotate: 15, ease: "power2.inOut" },
      0
    );
    tl.fromTo(
      content,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, ease: "power2.out" },
      0
    );

    // ✨ Separate fade-in for inner text when it enters viewport
    gsap.utils.toArray<HTMLElement>(".fade-in").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[var(--leaf)] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6)_100%)]">
      {/* Left Leaf */}
      <div
        ref={leftLeafRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/4 -translate-y-2/4 z-30"
      >
        <Image
          src="/images/homalomena-foliage-green-leaf-with-red-petioles-isolated-on-white-background-with-clipping-removebg-preview.png"
          alt="Left Leaf"
          width={660}
          height={660}
          priority
        />
      </div>

      {/* Right Leaf */}
      <div
        ref={rightLeafRef}
        className="absolute bottom-0 left-1/2 -translate-x-2/4 -translate-y-2/4 z-30"
      >
        <Image
          src="/images/homalomena-foliage-green-leaf-with-red-petioles-isolated-on-white-background-with-clipping-removebg-preview.png"
          alt="Right Leaf"
          width={660}
          height={660}
          className="rotate-100"
          priority
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center"
      >
        <h1 className="fade-in text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl">
          Woodvale
        </h1>
        <p className="fade-in text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-lg">
          Where nature meets tranquility. Experience a peaceful sanctuary
          designed for relaxation and connection.
        </p>
        <Link href="/reserve" className="fade-in btn-primary">
          Reserve a Table
        </Link>
      </div>
    </section>
  );
}
