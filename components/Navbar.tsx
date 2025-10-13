"use client";

import { useState } from "react";
import cinzel from "@/hooks/useFont";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <section className="h-20 md:h-16 flex items-center justify-between py-2 px-8 bg-[#f6f3ea] border-b-2 border-black relative z-50">
        <div className="resName">
          <h1 className={`${cinzel.className} text-3xl`}>WOODVALE</h1>
        </div>
        
        {/* Desktop Menu */}
        <div className="items hidden md:flex font-light text-md">
          <div className="flex items-center gap-4">
            <ul className="md:flex md:gap-10 hidden">
              <li className="hover:text-[var(--gold)] duration-300 cursor-pointer">Home</li>
              <li className="hover:text-[var(--gold)] duration-300 cursor-pointer">About</li>
              <li className="hover:text-[var(--gold)] duration-300 cursor-pointer">Menu</li>
              <li className="hover:text-[var(--gold)] duration-300 cursor-pointer">Contact</li>
              <li className="hover:text-[var(--gold)] duration-300 cursor-pointer">Banquet</li>
            </ul>
            <div className="hidden lg:flex text-[var(--gold)] text-sm">
              <button className="cursor-pointer border-2 border-[var(--gold)] py-3 px-4 my-1 rounded-full hover:bg-[var(--gold)] duration-300 hover:text-white">
                Reserve Your Table
              </button>
            </div>
          </div>
        </div>

        {/* Burger Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
          ></span>
        </button>
      </section>

          {/* CTA Button */}
          <Link href="/reserve" className="btn-primary hidden md:inline-block">
            Reserve a Table
          </Link>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-20 left-0 right-0 bg-[#f6f3ea] border-b-2 border-black z-40 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="px-8 py-6">
          <ul className="space-y-4 text-lg font-light">
            <li className="hover:text-[var(--gold)] duration-300 cursor-pointer py-2">Home</li>
            <li className="hover:text-[var(--gold)] duration-300 cursor-pointer py-2">About</li>
            <li className="hover:text-[var(--gold)] duration-300 cursor-pointer py-2">Menu</li>
            <li className="hover:text-[var(--gold)] duration-300 cursor-pointer py-2">Contact</li>
            <li className="hover:text-[var(--gold)] duration-300 cursor-pointer py-2">Banquet</li>
          </ul>
          <div className="mt-6">
            <button className="w-full cursor-pointer border-2 border-[var(--gold)] py-3 px-4 rounded-full hover:bg-[var(--gold)] duration-300 text-[var(--gold)] hover:text-white">
              Reserve Your Table
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-2 space-y-4 px-4 pb-4 border-b border-[var(--muted)]/20`}>
            {['Home', 'About', 'Menu', 'Banquet', 'Contact'].map((label, idx) => (
              <Link
                key={idx}
                href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                className={`block ${
                  isScrolled ? scrolledTextColor : textColor
                } ${hoverColor} transition-colors duration-200 font-medium`}
                onClick={() => setMobileMenuOpen(false)} // close menu on link click
              >
                {label}
              </Link>
            ))}

            <Link
              href="/reserve"
              className="btn-primary block text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reserve a Table
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
