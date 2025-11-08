import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

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
            toggleActions: "play none none none",
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
            <div className="services-header mb-12 text-3xl lg:mb-0 lg:w-2/5 lg:sticky lg:top-32 text-center lg:text-left">
              <p className="text-white/80 text-sm uppercase tracking-wider mb-3">
                What we offer
              </p>
              <h3 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Our Great Services
              </h3>
              <p className="text-white/70 text-sm sm:text-lg lg:text-base leading-relaxed">
                The atmosphere sets the stage. It's about more than just a
                dining room away from home, it's a curated experience where
                every detail is considered. From the warm lighting to attentive
                service, each touch is designed to welcome you in and let the
                outside world fade away. Here, food takes the spotlight as
                guests savour thoughtful flavours, crafted cocktails, and
                moments that unfold with ease, comfort, and understated
                elegance. Whether you're joining us for a celebration, a quiet
                evening, or a refined night out, The Woodvale Room offers an
                elevated escape built around connection, culinary artistry, and
                timeless hospitality.
              </p>
            </div>

            {/* Service Cards */}
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 lg:w-3/5">
              {/* Example Card */}
              <Link href="/about" className="service-card group cursor-pointer">
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-4 shadow-2xl">
                  <img
                    src="/static/venue/IMG_0833.JPG"
                    alt="Elegant table setting with fine dining presentation"
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                <h4 className="font-sans text-lg sm:text-xl lg:text-2xl font-semibold text-white group-hover:text-[#a8d5ba] transition-all duration-300 text-center">
                  Fine Dining Experience
                </h4>
              </Link>

              {/* Duplicate for other cards */}
              <Link
                href="/menu?category=drinks"
                className="service-card group cursor-pointer"
              >
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-4 shadow-2xl">
                  <Image
                    src="/static/venue/bar.jpg"
                    alt="Sophisticated bar area with craft cocktails"
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                <h4 className="font-sans text-lg sm:text-xl lg:text-2xl font-semibold text-white group-hover:text-[#a8d5ba] transition-all duration-300 text-center">
                  Cocktail Bar
                </h4>
              </Link>

              <Link
                href="/menu?category=food"
                className="service-card group cursor-pointer"
              >
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden mb-4 shadow-2xl">
                  <Image
                    src="/static/venue/culinary-artistry.jpg"
                    alt="Beautifully plated gourmet dish with elegant presentation"
                    fill
                    style={{ objectFit: "cover", objectPosition: "bottom" }}
                    className="transition-all duration-700 ease-out brightness-75 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                <h4 className="font-sans text-lg sm:text-xl lg:text-2xl font-semibold text-white group-hover:text-[#a8d5ba] transition-all duration-300 text-center">
                  Culinary Artistry{" "}
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
