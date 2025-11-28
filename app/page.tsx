"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/Testimonial";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/WhatWeOffer";
// import ReservationForm from "@/components/ReservationForm";
import Banquet from "@/components/Banquet";
import FeelOrder from "@/components/FeelOrder";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Or use your EventBooking component here if you prefer */}
      <Banquet />

      {/* Bottom Gallery Section */}
      <ServicesSection />

      <FeelOrder />

      <TestimonialsSection />

      {/* <ReservationForm />  */}
      <Footer />
    </div>
  );
}