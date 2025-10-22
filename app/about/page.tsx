"use client";
import React, { useEffect, useRef } from "react";
import { Leaf, Heart, MapPin, Award, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type Restaurant = {
  name: string;
  tagline: string;
  description: string;
  atmosphere: string;
  cuisine: string;
  experience: string;
  offerings: string;
  dedication: string;
  location?: string;
};

type Highlight = {
  icon: React.ElementType;
  title: string;
  description: string;
};

export default function AboutPage() {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLDivElement | null>(null);
  const storyCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Hero entrance animation
    if (heroTitleRef.current) {
      heroTitleRef.current.style.opacity = "0";
      heroTitleRef.current.style.transform = "translateY(60px)";

      setTimeout(() => {
        heroTitleRef.current!.style.transition =
          "all 1.5s cubic-bezier(0.16, 1, 0.3, 1)";
        heroTitleRef.current!.style.opacity = "1";
        heroTitleRef.current!.style.transform = "translateY(0)";
      }, 100);
    }

    // Parallax scroll effect
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    document.querySelectorAll<HTMLElement>(".fade-in-section").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(60px)";
      el.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
      observer.observe(el);
    });

    // Stagger animation for story cards
    storyCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        card.style.transitionDelay = `${index * 0.15}s`;

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 800);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const restaurant: Restaurant = {
    name: "The Woodvale Room",
    tagline: "Hidden within the heart of Mill Woods",
    description:
      "Hidden within the heart of Mill Woods, The Woodvale Room invites guests into an intimate escape inspired by the beauty and mystery of the forest. Nestled inside the Woodvale Community Facility, this reimagined space blends elegance with a secret-society charm.",
    atmosphere:
      "A place where flickering candlelight, rich wood tones, and thoughtful details set the stage for unforgettable evenings.",
    cuisine:
      "Our menu draws inspiration from classic dishes, reinterpreted with a distinctly Canadian twist. Each plate tells a story of the terrain—from the forests and fields to the lakes and prairies, showcasing local ingredients and flavours that celebrate the land around us.",
    experience:
      "Whether you're joining us for a quiet date night, a milestone celebration, or a private gathering in The Study, our secluded dining room, every visit feels like discovering something hidden and rare.",
    offerings:
      "From imaginative cocktails and an extensive wine list to carefully crafted dishes that evoke both comfort and curiosity, The Woodvale Room was created as a space for the community to connect, celebrate, and savour something truly special.",
    dedication:
      "Our team has worked tirelessly to breathe new life into this space—for those who seek not just a meal, but an experience worth remembering.",
  };

  const highlights: Highlight[] = [
    {
      icon: MapPin,
      title: "Secret Location",
      description: "Hidden gem inside Woodvale Community Facility",
    },
    {
      icon: Leaf,
      title: "Canadian Terrain",
      description: "Ingredients from forests, fields, lakes & prairies",
    },
    {
      icon: Sparkles,
      title: "The Study",
      description: "Our exclusive private dining room",
    },
    {
      icon: Award,
      title: "Crafted Experience",
      description: "Imaginative cocktails & extensive wine selection",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1f1c] text-white overflow-x-hidden">
      <Navbar />
      <style jsx>{`
        .highlight-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(10px);
        }
        .highlight-card:hover {
          transform: translateY(-8px) scale(1.02);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
        }
        .cta-button {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(42, 51, 45, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }
        .cta-button:hover::before {
          width: 300px;
          height: 300px;
        }
        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .story-section {
          background: linear-gradient(135deg, rgba(74, 93, 78, 0.15) 0%, rgba(42, 51, 45, 0.05) 100%);
          border-left: 3px solid rgba(255, 255, 255, 0.2);
        }
        .decorative-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f1c]/70 via-[#1a1f1c]/50 to-[#1a1f1c]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_30%,rgba(0,0,0,0.7)_100%)]" />
        
        <div ref={heroTitleRef} className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-4 inline-block">
            <div className="flex items-center justify-center gap-2 text-white/60 text-sm tracking-widest uppercase mb-3">
              <div className="w-12 h-px bg-white/40"></div>
              <span>Est. 2024</span>
              <div className="w-12 h-px bg-white/40"></div>
            </div>
          </div>
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight">
            {restaurant.name}
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-8 leading-relaxed">
            {restaurant.tagline}
          </p>
          <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{restaurant.location}</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 float-animation">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-32 px-6 max-w-6xl mx-auto">
        <div className="fade-in-section text-center mb-20">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Discover the Hidden
          </h2>
          <div className="decorative-line w-32 mx-auto mb-8"></div>
          <p className="text-xl sm:text-2xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            {restaurant.description}
          </p>
        </div>

        <div className="fade-in-section">
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed text-center max-w-3xl mx-auto">
            {restaurant.atmosphere}
          </p>
        </div>
      </section>

      {/* Story Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            ref={(el) => {storyCardsRef.current[0] = el}}
            className="story-section p-8 sm:p-12 rounded-2xl"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
              The Canadian Table
            </h3>
            <p className="text-white/80 text-lg leading-relaxed">
              {restaurant.cuisine}
            </p>
          </div>

          <div
            ref={(el) => {storyCardsRef.current[1] = el}}
            className="story-section p-8 sm:p-12 rounded-2xl"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
              Every Occasion
            </h3>
            <p className="text-white/80 text-lg leading-relaxed">
              {restaurant.experience}
            </p>
          </div>
        </div>

        <div
          ref={(el) => {storyCardsRef.current[2] = el}}
          className="story-section p-8 sm:p-12 rounded-2xl"
        >
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            Crafted for You
          </h3>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            {restaurant.offerings}
          </p>
          <p className="text-white/60 text-base leading-relaxed italic">
            {restaurant.dedication}
          </p>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-[#2a332d]/30">
        <div className="max-w-7xl mx-auto">
          <div className="fade-in-section text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              What Makes Us Special
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              An intimate escape where every detail tells a story
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="fade-in-section highlight-card p-8 rounded-2xl border border-white/10 bg-white/5"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-5">
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">
                  {highlight.title}
                </h3>
                <p className="text-white/70 text-base leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Image Section */}
      <section className="py-24 px-6">
        <div className="fade-in-section max-w-7xl mx-auto">
          <div className="relative h-[70vh] rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=80"
              alt="The Woodvale Room interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f1c] via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12 text-center">
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light italic">
                "Not just a meal, but an experience worth remembering"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#2a332d]/30 to-[#4a5d4e]/50">
        <div className="fade-in-section max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-8">
            Join Us
          </h2>
          <p className="text-xl sm:text-2xl mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover what lies hidden in the heart of Mill Woods. Reserve your table and become part of our story.
          </p>
          <button className="cta-button relative bg-[var(--muted)] text-[#1a1f1c] font-semibold px-7 py-4 rounded-full text-lg">
            <span className="relative z-10">Reserve Your Experience</span>
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}