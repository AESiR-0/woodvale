"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Leaf, Heart, Users, Sprout } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutUs from "@/components/OurStory";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const parallaxRef = useRef(null);
  const heroTitleRef = useRef(null);
  const ctaSectionRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroTitleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    // Parallax effect for hero background
    gsap.to(parallaxRef.current, {
      y: () => window.innerHeight * 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: parallaxRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Fade in generic sections
    const fadeInSections = document.querySelectorAll(".fade-in-section");
    fadeInSections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Animate value cards
    const valueCards = document.querySelectorAll(".value-card");
    gsap.fromTo(
      valueCards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Layered takeover for CTA Section
    gsap.fromTo(
      ctaSectionRef.current,
      { opacity: 0, y: 100, zIndex: -1 },
      {
        opacity: 1,
        y: 0,
        zIndex: 10,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaSectionRef.current,
          start: "top bottom",
          end: "top 60%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const restaurant = {
    name: "WOODVALE",
    tagline: "Where Forest Meets Table",
    description:
      "At Woodvale, we believe that the best meals are those that connect us to the earth. Our forest-inspired dining experience brings together locally-sourced ingredients, sustainable practices, and the warmth of woodland hospitality. Every dish tells a story of the land, the seasons, and the farmers who nurture our ingredients with care.",
    mission:
      "Our mission is to create a dining sanctuary where guests can escape the rush of modern life and reconnect with nature through thoughtfully prepared, seasonal cuisine. We partner with local farmers and foragers to bring you the freshest ingredients, prepared with techniques that honor both tradition and innovation.",
    story:
      "Founded in 2020, Woodvale emerged from a simple dream: to create a restaurant that feels like a retreat into the forest. Our founders, inspired by childhood memories of family gatherings in woodland cabins, designed every aspect of Woodvale to evoke the peace and beauty of nature. From our reclaimed wood tables to our living plant walls, every detail invites you to slow down, savor, and celebrate the bounty of the earth.",
  };

  const values = [
    {
      icon: Leaf,
      title: "Sustainable Sourcing",
      description:
        "We work exclusively with local farms practicing regenerative agriculture, ensuring every ingredient supports the health of our ecosystem.",
    },
    {
      icon: Heart,
      title: "Crafted with Care",
      description:
        "Our chefs treat each dish as a work of art, honoring the ingredients and the hands that grew them with meticulous attention to detail.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "We're more than a restaurant—we're a gathering place where neighbors become friends and every meal is a celebration of togetherness.",
    },
    {
      icon: Sprout,
      title: "Seasonal Menus",
      description:
        "Our menu changes with the seasons, showcasing the best of what nature offers at each moment throughout the year.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2A332D] text-white">
      <style jsx>{`
        .value-card {
          transition: all 0.3s ease;
        }
        .value-card:hover {
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
        }
        .cta-button {
          transition: all 0.3s ease;
        }
        .cta-button:hover {
          background: rgba(42, 51, 45, 0.9);
          color: white;
        }
      `}</style>

      {/* Hero Section */}
      <Navbar />
      <section className="relative h-[80vh] sm:h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 w-full h-[120%] sm:h-[110%] md:h-[120%]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A332D]/60 via-[#2A332D]/40 to-[#2A332D]/90" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.6)_100%)] z-10" />
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-3xl sm:max-w-4xl mx-auto">
          <h1
            ref={heroTitleRef}
            className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          >
            {restaurant.name}
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white/80">
            {restaurant.tagline}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <AboutUs />

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="fade-in-section text-center mb-10 sm:mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              What We Stand For
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Our values guide every decision we make, from sourcing to service
            </p>
          </div>
          <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card p-4 sm:p-6 rounded-lg border border-white/10 bg-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                  <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 relative z-[5]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="fade-in-section">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Our Philosophy
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-4 sm:mb-6">
              {restaurant.description}
            </p>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              {restaurant.mission}
            </p>
          </div>
          <div className="fade-in-section relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
              alt="Fresh ingredients"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full flex justify-center fade-in-section py-8 sm:py-12">
        <div className="w-full max-w-5xl aspect-video overflow-hidden shadow-xl relative rounded-lg">
          <video
            className="w-full h-full object-cover"
            src="/videos/restaurant.mp4"
            autoPlay
            loop
            muted
            playsInline
            onError={(e) => {
              const target = e.currentTarget as HTMLVideoElement;
              target.style.display = "none"; // hide video
              const fallback = document.getElementById(
                "video-fallback"
              ) as HTMLDivElement;
              if (fallback) fallback.style.display = "block";
            }}
          />
          {/* Fallback Image */}
          <div
            id="video-fallback"
            className="w-full h-full object-cover absolute inset-0 hidden"
            style={{
              backgroundImage: "url('/images/forestBg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Overlay for cinematic look */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaSectionRef}
        className="relative bg-[#4A5D4E] text-white py-16 sm:py-20 md:py-28 overflow-hidden z-[1]"
      >
        <div className="fade-in-section max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Visit Us
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            We'd love to welcome you to Woodvale. Come experience our
            forest-inspired dining for yourself.
          </p>
          <div>
            <Link
              href="/reserve"
              className="inline-block bg-white text-[#2A332D] font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 hover:bg-[#e5e5e5]"
            >
              Save Your Seat
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
