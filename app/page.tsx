"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/Testimonial";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/WhatWeOffer";
import ReservationForm from "@/components/ReservationForm";
import Banquet from "@/components/Banquet";
import FeelOrder from "@/components/FeelOrder";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Time-Honored Flavors Section */}
      {/* <section className="section bg-[var(--leaf)]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Elegant dining room with warm lighting and tropical plants"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-sans text-4xl lg:text-5xl font-bold text-white leading-tight">
                Time-Honored Flavors,
                <br />
                Contemporary Twists
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                Our menu is a celebration of classic recipes, thoughtfully
                reimagined to embrace the evolving palate of the modern
                connoisseur. Our talented chefs infuse their creations with a
                touch of innovation while preserving the authenticity and
                essence of timeless flavors.
              </p>
              <Link href="/menu" className="btn-secondary">
                View Our Menu
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Private Events Section */}
      {/* <section className="section bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="font-sans text-4xl lg:text-5xl font-bold text-[var(--muted)] leading-tight">
                Private Events
              </h2>
              <p className="text-lg leading-relaxed text-[var(--muted)]">
                Looking for a distinctive venue to host a special event? Our
                private dining area offers a cozy and elegant space that can be
                customized to your unique needs, whether it's an intimate
                celebration or a business gathering.
              </p>
              <Link href="/banquet" className="btn-secondary">
                View Private Dining
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Private banquet room with elegant table setting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Or use your EventBooking component here if you prefer */}
      <Banquet />


      {/* Bottom Gallery Section */}
      <ServicesSection />

      <FeelOrder />

      <TestimonialsSection />

      <ReservationForm />

      <Footer />
    </div>
  );
}
// style={{
          // backgroundImage:
            // "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80')",
        // }}