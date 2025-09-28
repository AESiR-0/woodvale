"use client";

import cinzel from "@/utils/useFont";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen relative overflow-hidden">
      {/* Heading */}
      <div className="relative z-10 bg-[#f6f3ea]">
        {" "}
        <div className="header text-center pt-8 font-serif tracking-tight text-black">
          <h1 className={`${cinzel.className} text-[clamp(2rem,6vw,6rem)]`}>
            Savor the Classics
          </h1>
        </div>
      </div>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Elegant restaurant interior with warm lighting and tropical plants"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </section>
  );
}
