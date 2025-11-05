export default function MenuAnimations() {
  return (
    <style jsx global>{`
      @keyframes pageFlip {
        0% {
          transform: rotateY(0deg) scale(0.3);
          opacity: 0;
        }
        50% {
          transform: rotateY(90deg) scale(1.1);
          opacity: 0.5;
        }
        100% {
          transform: rotateY(0deg) scale(1);
          opacity: 1;
        }
      }

      .animate-pageFlip {
        animation: pageFlip 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }

      @keyframes spinOut {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        20% {
          opacity: 0;
        }
        100% {
          transform: translate(-500%, 80%) scale(0.8);
          opacity: 0;
        }
      }

      @keyframes spinIn {
        0% {
          transform: translate(120%, -200%) scale(0.7);
          opacity: 0;
        }
        100% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
      }

      @keyframes spinOutBackward {
        0% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
        20% {
          opacity: 0;
        }
        100% {
          transform: translate(120%, -200%) scale(0.7);
          opacity: 0;
        }
      }

      @keyframes spinInBackward {
        0% {
          transform: translate(-500%, 80%) scale(0.8);
          opacity: 0;
        }
        100% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
      }

      @keyframes fadeSlideIn {
        0% {
          opacity: 0;
          transform: translateY(20px) scale(0.9);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .animate-spinOut {
        animation: spinOut 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }

      .animate-spinIn {
        animation: spinIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }

      .animate-spinOutBackward {
        animation: spinOutBackward 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
          forwards;
      }

      .animate-spinInBackward {
        animation: spinInBackward 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)
          forwards;
      }

      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      .animate-float {
        animation: float 3s ease-in-out infinite;
      }

      /* Paper Scroll Animation */
      .paper-scroll-button {
        width: 80px;
        height: 80px;
        perspective: 1000px;
      }

      .paper-scroll {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        animation: scrollRoll 4s ease-in-out infinite;
      }

      .scroll-content {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #d4af37 0%, #b8860b 50%, #daa520 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 
          0 0 20px rgba(212, 175, 55, 0.3),
          8px 8px 20px rgba(0, 0, 0, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.2);
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .scroll-content::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
        animation: scrollPattern 3s linear infinite;
      }

      .paper-scroll-button:hover .scroll-content {
        transform: scale(1.1);
        box-shadow: 
          0 0 30px rgba(212, 175, 55, 0.5),
          10px 10px 25px rgba(0, 0, 0, 0.5),
          inset 0 3px 6px rgba(255, 255, 255, 0.3);
      }

      @keyframes scrollRoll {
        0%, 100% {
          transform: rotateY(0deg) rotateX(0deg);
        }
        25% {
          transform: rotateY(15deg) rotateX(5deg);
        }
        50% {
          transform: rotateY(0deg) rotateX(10deg);
        }
        75% {
          transform: rotateY(-15deg) rotateX(5deg);
        }
      }

      @keyframes scrollPattern {
        0% {
          transform: translate(0, 0) rotate(0deg);
        }
        100% {
          transform: translate(20px, 20px) rotate(360deg);
        }
      }

      /* Page Peel Animation - Peels from bottom-right to top-left */
      @keyframes pagePeel {
        0% {
          transform: rotateY(0deg) rotateX(0deg) scale(1);
          opacity: 1;
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
        25% {
          transform: rotateY(-15deg) rotateX(5deg) scale(1);
          opacity: 0.95;
          clip-path: polygon(0% 0%, 95% 0%, 100% 95%, 5% 100%);
        }
        50% {
          transform: rotateY(-45deg) rotateX(10deg) scale(1.02);
          opacity: 0.8;
          clip-path: polygon(0% 0%, 85% 0%, 100% 85%, 15% 100%);
        }
        75% {
          transform: rotateY(-90deg) rotateX(15deg) scale(1.05);
          opacity: 0.5;
          clip-path: polygon(0% 0%, 70% 0%, 100% 70%, 30% 100%);
        }
        100% {
          transform: rotateY(-180deg) rotateX(20deg) scale(1.1);
          opacity: 0;
          clip-path: polygon(0% 0%, 0% 0%, 100% 0%, 100% 0%);
        }
      }

      .page-peel {
        animation: pagePeel 1s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        z-index: 40;
      }
    `}</style>
  );
}

