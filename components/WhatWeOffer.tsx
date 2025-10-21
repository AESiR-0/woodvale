import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header with smoother easing
      gsap.fromTo(
        ".services-header",
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".services-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate service cards with smoother stagger and easing
      const serviceCards = document.querySelectorAll(".service-card");
      if (serviceCards) {
        gsap.fromTo(
          serviceCards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: serviceCards[0],
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
<section ref={sectionRef} className="bg-[var(--leaf)]">
  <div
    className="bg-gradient-radial py-16 md:py-20 lg:py-24 px-4 md:px-6"
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.6) 100%)",
    }}
  >
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
        {/* Section Header */}
        <div className="services-header mb-12 lg:mb-0 lg:w-2/5 lg:sticky lg:top-32 text-center lg:text-left">
          <p className="text-white/80 text-sm uppercase tracking-wider mb-3">
            What we offer
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Our Great Services
          </h2>
          <p className="text-white/70 text-base sm:text-lg lg:text-base leading-relaxed">
            The atmosphere sets the stage. It's about more than just a dining room away from home. Food takes the spotlight as guests.
          </p>
        </div>

        {/* Service Cards */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 lg:w-3/5">
          {/* Example Card */}
          <div className="service-card group cursor-pointer">
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-4 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Elegant table setting with fine dining presentation"
                fill
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="font-sans text-lg sm:text-xl lg:text-2xl font-semibold text-white group-hover:text-[#a8d5ba] transition-all duration-300 text-center">
              Fine Dining Experience
            </h3>
          </div>

          {/* Duplicate for other cards */}
          <div className="service-card group cursor-pointer">
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-4 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Sophisticated bar area with craft cocktails"
                fill
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="font-sans text-lg sm:text-xl lg:text-2xl font-semibold text-white group-hover:text-[#a8d5ba] transition-all duration-300 text-center">
              Speakeasy Bar
            </h3>
          </div>

          <div className="service-card group cursor-pointer">
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-4 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Artfully plated savory dish with tropical elements"
                fill
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="font-sans text-lg sm:text-xl lg:text-2xl font-semibold text-white group-hover:text-[#a8d5ba] transition-all duration-300 text-center">
              Culinary Artistry
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}