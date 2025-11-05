"use client";
import React from "react";

interface FoldedPaperCardProps {
  onClick: () => void;
}

export default function FoldedPaperCard({ onClick }: FoldedPaperCardProps) {
  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <div 
        className="absolute bottom-4 right-4 z-[9999]" 
        style={{ 
          perspective: "2000px",
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          pointerEvents: "auto",
          isolation: "isolate"
        }}
      >
        <div
          className="paper-corner-fold cursor-pointer"
          onClick={handleClick}
          style={{ 
            transformStyle: "preserve-3d",
            transformOrigin: "bottom right",
            pointerEvents: "auto"
          }}
        >
          {/* "Peek here" Text positioned on the fold */}
          <div className="absolute bottom-10 right-10 transform -rotate-45 origin-bottom-right z-10 pointer-events-none">
            <div className="text-center">
              <p className="text-white font-serif text-base font-bold mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Peek
              </p>
              <p className="text-white font-serif text-base font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                here
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Realistic Paper Curl Effect - Like CodePen zovXWy */
        /* Positioned at bottom-right corner, floating */
        .paper-corner-fold {
          position: relative;
          width: 150px;
          height: 150px;
          cursor: pointer;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Main curl shape - golden underside of page with realistic curve */
        /* Creates a smooth, organic page curl from bottom-right corner */
        .paper-corner-fold::before {
          position: absolute;
          content: '';
          bottom: 0;
          right: 0;
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #d4af37 0%, #b8860b 50%, #daa520 100%);
          clip-path: path('M 150 150 L 150 100 C 150 70 130 50 100 45 C 70 40 40 50 20 75 L 0 75 L 0 150 Z');
          box-shadow: 
            8px 8px 20px rgba(0, 0, 0, 0.4),
            4px 4px 12px rgba(0, 0, 0, 0.3),
            -2px -2px 8px rgba(0, 0, 0, 0.2),
            inset -1px -1px 2px rgba(0, 0, 0, 0.1),
            0 0 20px rgba(212, 175, 55, 0.3);
          z-index: 2;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        /* Shadow underneath the curl - darker near the fold, fading outward */
        .paper-corner-fold::after {
          position: absolute;
          content: '';
          bottom: 0;
          right: 0;
          width: 150px;
          height: 150px;
          background: radial-gradient(ellipse 140px 100px at bottom right, 
            rgba(0, 0, 0, 0.7) 0%, 
            rgba(0, 0, 0, 0.5) 20%,
            rgba(0, 0, 0, 0.35) 35%,
            rgba(0, 0, 0, 0.2) 50%,
            rgba(0, 0, 0, 0.1) 65%, 
            rgba(0, 0, 0, 0.05) 80%,
            transparent 95%);
          clip-path: path('M 150 150 L 150 100 C 150 70 130 50 100 45 C 70 40 40 50 20 75 L 0 75 L 0 150 Z');
          z-index: 1;
        }

        .paper-corner-fold:hover::before {
          transform: scale(1.05);
          box-shadow: 
            10px 10px 25px rgba(0, 0, 0, 0.5),
            5px 5px 15px rgba(0, 0, 0, 0.35),
            -3px -3px 10px rgba(0, 0, 0, 0.25),
            inset -2px -2px 3px rgba(0, 0, 0, 0.15),
            0 0 30px rgba(212, 175, 55, 0.5);
        }

      `}</style>
    </>
  );
}

