'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type NavbarProps = {
  bgColor?: string;          // background before scroll
  scrolledBgColor?: string;  // background after scroll
  textColor?: string;        // text before scroll
  scrolledTextColor?: string; // text after scroll
  hoverColor?: string;       // hover text color
};

export default function Navbar({
  bgColor = 'bg-transparent',
  scrolledBgColor = 'bg-[#f0ece6]',
  textColor = 'text-white',
  scrolledTextColor = 'text-black',
  hoverColor = 'hover:text-[var(--mint)]',
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? `${scrolledBgColor} ${scrolledTextColor} backdrop-blur-sm border-b border-[var(--muted)]/20`
          : `${bgColor} ${textColor}`
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/static/logos/2D.PNG"
              alt="Woodvale Restaurant Logo"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Menu', 'Banquet', 'Contact'].map((label, idx) => (
              <Link
                key={idx}
                href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                className={`${
                  isScrolled ? scrolledTextColor : textColor
                } ${hoverColor} transition-colors duration-200 font-medium`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/reserve" className="btn-primary hidden md:inline-block">
            Reserve a Table
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden ${
              isScrolled ? scrolledTextColor : textColor
            } ${hoverColor} transition-colors duration-200`}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-2 space-y-4 px-4 pb-4 border-b border-[var(--muted)]/20`}>
            {['Home', 'About', 'Menu', 'Banquet', 'Contact'].map((label, idx) => (
              <Link
                key={idx}
                href={label === 'Home' ? '/' : `/${label.toLowerCase()}`}
                className={`
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
    </nav>
  );
}
