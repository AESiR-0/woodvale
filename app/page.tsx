"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Introduction Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg leading-relaxed text-[var(--muted)] mb-16">
              Nestled in the heart of the city, Woodvale invites you to
              experience a dining journey that marries classic elegance with
              modern comfort. From the moment you step through our doors, you'll
              be enveloped in a warm and inviting ambiance that promises an
              unforgettable dining experience.
            </p>

            {/* Three Image Strip */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group cursor-pointer">
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Artisanal cocktail with tropical garnish"
                    fill
                    className="object-cover image-hover"
                  />
                </div>
                <h3 className="font-sans text-lg font-semibold text-[var(--muted)] group-hover:text-[var(--leaf)] transition-colors">
                  Craft Cocktails
                </h3>
              </div>

              <div className="group cursor-pointer">
                <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Elegant restaurant interior with tropical plants"
                    fill
                    className="object-cover image-hover"
                  />
                </div>
                <h3 className="font-sans text-lg font-semibold text-[var(--muted)] group-hover:text-[var(--leaf)] transition-colors">
                  Tropical Ambiance
                </h3>
              </div>

              <div className="group cursor-pointer">
                {/* <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Beautifully plated gourmet dish"
                    fill
                    className="object-cover image-hover"
                  />
                </div> */}
                <h3 className="font-sans text-lg font-semibold text-[var(--muted)] group-hover:text-[var(--leaf)] transition-colors">
                  Gourmet Cuisine
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

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
      <EventBooking />

      {/* Bottom Gallery Section */}
      <section className="section bg-[var(--leaf)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Elegant table setting with fine dining presentation"
                  fill
                  className="object-cover image-hover"
                />
              </div>
              <h3 className="font-sans text-lg font-semibold text-white group-hover:text-[var(--mint)] transition-colors">
                Fine Dining Experience
              </h3>
            </div>

            <div className="group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Sophisticated bar area with craft cocktails"
                  fill
                  className="object-cover image-hover"
                />
              </div>
              <h3 className="font-sans text-lg font-semibold text-white group-hover:text-[var(--mint)] transition-colors">
                Speakeasy Bar
              </h3>
            </div>

            <div className="group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Artfully plated savory dish with tropical elements"
                  fill
                  className="object-cover image-hover"
                />
              </div>
              <h3 className="font-sans text-lg font-semibold text-white group-hover:text-[var(--mint)] transition-colors">
                Culinary Artistry
              </h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
