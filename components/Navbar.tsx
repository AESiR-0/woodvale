"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <section className="h-20 md:h-16 flex items-center justify-center md:justify-between py-2 px-8 bg-[#f6f3ea] border-b-2 border-black">
      <div className="resName">
        <h1 className="text-3xl">WOODVALE</h1>
      </div>
      <div className="items hidden md:flex font-light text-md">
        <div className="flex items-center gap-4">
          {" "}
          <ul className="md:flex md:gap-10 hidden">
            <li className="hover:text-[var(--gold)] duration-300">Home</li>
            <li className="hover:text-[var(--gold)] duration-300">About</li>
            <li className="hover:text-[var(--gold)] duration-300">Menu</li>
            <li className="hover:text-[var(--gold)] duration-300">Contact</li>
            <li className="hover:text-[var(--gold)] duration-300">Banquet</li>
          </ul>
          <div className="hidden lg:flex text-[var(--gold)] text-sm">
            <button className="cursor-pointer border-2 border-[var(--gold)] py-3 px-4 my-1 rounded-full hover:bg-[var(--gold)] duration-300  hover:text-white ">
              Reserve Your Table
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
