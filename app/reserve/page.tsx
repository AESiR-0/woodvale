"use client";

import { useEffect } from "react";

const OPENTABLE_URL = "https://www.opentable.ca/r/the-woodvale-room-reservations-edmonton?restref=1466050&lang=en-CA&ot_source=Restaurant%20website";

export default function BookingPage() {
  useEffect(() => {
    // Redirect to OpenTable immediately
    window.location.href = OPENTABLE_URL;
  }, []);

  // Show loading message while redirecting
  return (
    <div className="bg-[#2A332D] min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <p className="text-lg mb-4">Redirecting to OpenTable...</p>
        <p className="text-sm text-white/70">
          If you are not redirected automatically,{" "}
          <a 
            href={OPENTABLE_URL} 
            className="text-[var(--mint)] hover:underline"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}
