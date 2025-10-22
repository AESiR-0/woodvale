"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  bgColor?: string; // background before scroll
  scrolledBgColor?: string; // background after scroll
  textColor?: string; // text before scroll
  scrolledTextColor?: string; // text after scroll
  hoverColor?: string; // hover text color
};

export default function Navbar({
  bgColor = "bg-transparent",
  scrolledBgColor = "bg-[#f0ece6]",
  textColor = "text-white",
  scrolledTextColor = "text-black",
  hoverColor = "hover:text-[var(--mint)]",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#071d18] text-black backdrop-blur-sm border-b border-[var(--muted)]/20'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/static/logos/2D.PNG"
              alt="Woodvale Restaurant Logo"
              width={96}
              height={96}
              className="w-24 h-24"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={` text-white  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              Home
            </Link>
            <Link
              href="/about"
                  className={` text-white  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              About
            </Link>
            <Link
              href="/menu"
              className={` text-white  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              Menu
            </Link>
            <Link
              href="/banquet"
              className={` text-white  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              Banquet
            </Link>
            <Link
              href="/contact"
              className={` text-white  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/reserve"
            className="btn-primary hidden capitalize md:inline-block"
          >
            save your seat
          </Link>

{/* Mobile Menu Button */}
<button
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  className={`md:hidden ${
    isScrolled ? scrolledTextColor : textColor
  } ${hoverColor} transition-colors duration-200 relative z-[60]`}
  aria-label="Toggle mobile menu"
  aria-expanded={mobileMenuOpen}
>
  {/* Show hamburger only when closed */}
  {!mobileMenuOpen && (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )}

  {/* Show cross only when open */}
  {mobileMenuOpen && (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )}
</button>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden flex flex-col bg-[var(--muted)] text-black rounded-lg pt-6 mt-2 space-y-4 px-4 pb-4 border-b border-[var(--muted)]/20`}
          >
            {["Home", "About", "Menu", "Banquet", "Contact"].map(
              (label, idx) => (
                <Link
                  key={idx}
                  href={label === "Home" ? "/" : `/${label.toLowerCase()}`}
                  className={`
                  isScrolled ? scrolledTextColor : textColor
                } ${hoverColor} transition-colors duration-200 font-medium hover:bg-[var(--muted)]`}
                  onClick={() => setMobileMenuOpen(false)} // close menu on link click
                >
                  {label}
                </Link>
              )
            )}

            <Link
              href="/reserve"
              className="btn-primary block text-center mt-2 capitalize"
              onClick={() => setMobileMenuOpen(false)}
            >
              Save Your Seat
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
