'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#f0ece6] text-black backdrop-blur-sm border-b border-[var(--muted)]/20'
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
              width={80}
              height={80}
              className="w-20 h-20"
            />

          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={` text-black ${isScrolled
                ? 'text-black' : 'text-white'}  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={` text-black ${isScrolled
                ? 'text-black' : 'text-white'}  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              About
            </Link>
            <Link
              href="/menu"
              className={` text-black ${isScrolled
                ? 'text-black' : 'text-white'}  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              Menu
            </Link>
            <Link
              href="/banquet"
              className={` text-black ${isScrolled
                ? 'text-black' : 'text-white'}  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              Banquet
            </Link>
            <Link
              href="/contact"
              className={` text-black ${isScrolled
                ? 'text-black' : 'text-white'}  hover:text-[var(--mint)] transition-colors duration-200 font-medium`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/reserve"
            className="btn-primary"
          >
            Reserve a Table
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black hover:text-[var(--mint)] transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
