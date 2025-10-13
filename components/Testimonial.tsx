"use client"

import { useRef, useState, MouseEvent } from "react"

interface Testimonial {
  text: string
  author: string
  rating: number
}

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeDot, setActiveDot] = useState<number>(0)
  const [isDown, setIsDown] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [scrollLeft, setScrollLeft] = useState<number>(0)

  const testimonials: Testimonial[] = [
    {
      text: "I had one of the best experiences exploring the rainforest! The air was pure and every step felt like a connection to nature.",
      author: "Sarah M., Australia",
      rating: 5,
    },
    {
      text: "Absolutely breathtaking! The sunrise through the misty trees was magical. This journey reconnected me with the earth.",
      author: "James P., United Kingdom",
      rating: 4,
    },
    {
      text: "The lush greenery and vibrant wildlife exceeded my expectations. It's truly a paradise for nature lovers!",
      author: "Maria G., Spain",
      rating: 5,
    },
    {
      text: "The forest felt alive — peaceful streams, singing birds, and towering trees. I left feeling refreshed and inspired.",
      author: "David L., Canada",
      rating: 4,
    },
    {
      text: "Every path was an adventure! The scents, the sights, and the silence of the woods — I could stay forever.",
      author: "Lisa K., Germany",
      rating: 3,
    },
    {
      text: "A spiritual retreat in the heart of nature. The harmony of the forest teaches you to slow down and breathe again.",
      author: "Yuki T., Japan",
      rating: 5,
    },
  ]

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    setIsDown(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDown(false)
  const handleMouseUp = () => setIsDown(false)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDown || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  const scrollLeftBtn = () => containerRef.current?.scrollBy({ left: -420, behavior: "smooth" })
  const scrollRightBtn = () => containerRef.current?.scrollBy({ left: 420, behavior: "smooth" })

  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return
    const scrollPercentage =
      container.scrollLeft / (container.scrollWidth - container.clientWidth)
    const newActiveDot = Math.round(scrollPercentage * 2)
    setActiveDot(newActiveDot)
  }

  const scrollToDot = (index: number) => {
    const container = containerRef.current
    if (!container) return
    const scrollAmount =
      (container.scrollWidth - container.clientWidth) * (index / 2)
    container.scrollTo({ left: scrollAmount, behavior: "smooth" })
  }

  return (
    <div className="py-16 px-0 bg-[var(--leaf)] relative overflow-hidden">
      {/* Vignette Effect */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes leafPop {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(360deg);
          }
        }
        .header-animate {
          animation: fadeInDown 0.8s ease forwards;
        }
        .card-animate {
          animation: slideInRight 0.8s ease forwards;
        }
        .leaf {
          animation: leafPop 0.6s ease forwards;
        }
        .testimonials-container::-webkit-scrollbar {
          height: 8px;
        }
        .testimonials-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-left ml-6 mb-6 px-5 header-animate opacity-0">
          <h2 className="text-sm tracking-[2px] text-green-200 mb-2.5 uppercase">
            learn more about
          </h2>
          <h1 className="text-[42px] capitalize font-light tracking-wide text-green-100">
            what our visitors say
          </h1>
        </div>

        <div className="relative py-5">
          <button
            onClick={scrollLeftBtn}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--leaf)] backdrop-blur-md border border-green-600/30 text-green-100 text-2xl cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-green-700/50 hover:scale-110 z-10"
          >
            ‹
          </button>

          <button
            onClick={scrollRightBtn}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[var(--leaf)] backdrop-blur-md border border-green-600/30 text-green-100 text-2xl cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-green-700/50 hover:scale-110 z-10"
          >
            ›
          </button>

          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
            className="testimonials-container flex gap-8 overflow-x-auto overflow-y-hidden py-5 px-10 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollBehavior: "smooth" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card-animate opacity-0 min-w-[380px] max-w-[380px] bg-[var(--leaf)] backdrop-blur-md border border-[var(--muted)]/40 rounded-2xl px-8 py-10 flex-shrink-0 relative overflow-hidden transition-all duration-300 hover:-translate-y-2.5 hover:scale-105 hover:border-[var(--muted)] group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex mb-3 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg transition-transform duration-150 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-[15px] leading-7 text-green-100 mb-5 relative z-10">
                  {testimonial.text}
                </p>

                <p className="text-sm text-[var(--muted)] italic relative z-10">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2.5 mt-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              onClick={() => scrollToDot(index)}
              className={`cursor-pointer transition-all duration-300 hover:scale-110 ${
                activeDot === index
                  ? "w-8 h-2.5 rounded-md bg-[var(--muted)]"
                  : "w-2.5 h-2.5 rounded-full bg-[var(--muted)]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
