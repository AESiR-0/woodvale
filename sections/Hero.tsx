"use client";
import cinzel from "@/hooks/useFont";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen relative overflow-hidden flex flex-col">
      {/* Background Image (covers whole screen) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Elegant restaurant interior with warm lighting and tropical plants"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Heading */}
      <div className="relative z-10 w-full bg-[#f6f3ea] text-center">
        <h1
          className={`${cinzel.className} overflow-auto whitespace-pre py-8 font-semibold text-6xl text-[clamp(1.5rem,4vw,5rem)] tracking-tight text-black`}
        >
          Savor the Classics
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row h-full">
        {/* Left Column */}
        <div className="relative w-full flex items-center justify-around">
          <div className="relative z-10 w-full md:w-2/4 flex flex-col gap-10 justify-around p-4 md:p-12 lg:p-24">
            <div className="desc h-96 sm:h-full text-center md:text-left text-base md:text-2xl max-w-lg flex flex-col justify-evenly text-white">
              <h1 className="text-4xl md:text-6xl font-semibold">
                Embrace the <span className="text-[var(--gold)]">Present</span>
              </h1>
              <p className="mt-4 md:mt-6">
                Experience the perfect blend of speakeasy elegance and tropical
                ambiance. Where timeless flavors meet contemporary innovation.
              </p>
            </div>
            <div className="flex justify-center md:justify-start">
              <button className="cursor-pointer border-2 border-[var(--gold)] py-3 px-6 rounded-full hover:bg-[var(--gold)] duration-300 text-white hover:text-black">
                Reserve Your Table
              </button>
            </div>
          </div>

          {/* Gold Sidebar (only from md and above) */}
          <div className="hidden md:block relative z-10 w-[250px] md:w-[350px] lg:w-[400px] translate-x-2/4 rounded-bl-[100px] md:rounded-bl-[150px] rounded-tl-[100px] md:rounded-tl-[150px] h-full bg-[var(--gold)]" />

          {/* Food Image (only from md and above) */}
          <div className="hidden md:block absolute z-20 top-1/2 -translate-y-1/2 right-6 md:right-10">
            <Image
              src="/images/food.png"
              alt="Delicious food dish"
              width={300}
              height={300}
              className="object-contain md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
