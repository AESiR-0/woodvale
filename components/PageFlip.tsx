"use client";
import React, { useState } from "react";
import TraditionalMenu from "./TraditionalManu";

interface PageFlipProps {
  isTraditionalMenu?: boolean;
}

export default function PageFlip({ isTraditionalMenu = false }: PageFlipProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((prev) => !prev);

  return (
    <div className="fixed inset-0 z-[10] perspective-[2000px] pointer-events-none select-none">
      {/* Flip container */}
      <div
        className={`absolute inset-0 origin-bottom-right transition-transform duration-[1200ms] [transform-style:preserve-3d] ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{
          pointerEvents: "none",
        }}
      >
        {/* Front side */}
        <div
          className="absolute inset-0 bg-[var(--leaf)] overflow-y-auto no-scrollbar rounded-tl-3xl shadow-2xl flex flex-col items-center justify-start backface-hidden"
          style={{ pointerEvents: flipped ? "none" : "auto" }}
        >
          {isTraditionalMenu ? <TraditionalMenu /> : <div>Loading...</div>}
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 bg-[var(--muted)] rounded-tl-3xl shadow-2xl flex items-center justify-center text-[var(--leaf)] text-2xl font-semibold rotate-y-180 backface-hidden"
          style={{ pointerEvents: flipped ? "auto" : "none" }}
        >
          {/* Empty back since we moved Peek To Seek to the corner */}
        </div>
      </div>

      {/* Page curl corner (clickable) */}
      <div
        className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-[var(--gold)] to-[var(--gold)]/60 rounded-tl-[100%] cursor-pointer transition-transform duration-300 hover:scale-110 pointer-events-auto flex items-center justify-center"
        onClick={handleFlip}
        title="Peek To Seek"
      >
        <span className="text-[var(--bg)] font-semibold text-sm -rotate-45 select-none">
          Peek&nbsp;To&nbsp;Seek
        </span>
      </div>

      {/* Styles */}
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
