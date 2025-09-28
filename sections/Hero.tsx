"use client";
import cinzel from "@/utils/useFont";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="h-screen relative overflow-hidden flex flex-col">
      <div className="relative z-10 w-full bg-[#f6f3ea] text-center">
        <h1
          className={`${cinzel.className} font-semibold text-[clamp(2rem,6vw,6rem)] tracking-tight text-black`}
        >
          Savor the Classics
        </h1>
      </div>
      <div className="relative flex flex-row h-screen">
        <div className="relative w-screen md:w-screen flex items-center justify-around">
          <div className="relative z-10 w-full md:w-2/4 flex flex-col gap-10 justify-around p-8 md:p-12 lg:p-24">
            <div className="desc h-50 text-center md:text-left text-base md:text-2xl max-w-lg flex flex-col justify-between text-white">
              <h1 className="text-6xl text-nowrap font-semibold">Embrace the <span className="text-[var(--gold)]">Present</span></h1>
              <p>
                Experience the perfect blend of speakeasy elegance and tropical
                ambiance. Where timeless flavors meet contemporary innovation.
              </p>
            </div>
            <div>
              <button className="cursor-pointer border-2 border-[var(--gold)] py-3 px-4 my-1 rounded-full hover:bg-[var(--gold)] duration-300 text-white  hover:text-black ">
                Reserve Your Table
              </button>
            </div>
          </div>
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Elegant restaurant interior with warm lighting and tropical plants"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/80" />
          </div>

          <div className="relative z-10 w-[400px] translate-x-2/4 rounded-bl-[150] rounded-tl-[150] h-full bg-[var(--gold)]" />

          <div className="absolute z-20 top-1/2 -translate-y-1/2 right-10">
            <Image
              src="/images/food.png"
              alt="Delicious food dish"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
