"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function SummaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SummaryContent />
    </Suspense>
  );
}

function SummaryContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Booking Summary";
  const dateTime = searchParams.get("dateTime") || "";
  const location = searchParams.get("location") || "";
  const guests = searchParams.get("guests") || "";
  const email = searchParams.get("email") || "";
  const benefits = searchParams.get("benefits") || "";
  const benefitDetails = searchParams.get("benefitDetails") || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--leaf)] to-[var(--leaf)]/90 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#2A332D]">{title}</h2>
          <p className="text-gray-600 mt-2">Your reservation has been confirmed!</p>
        </div>

        <div className="space-y-4 border-t pt-4">
          {dateTime && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Date & Time</p>
              <p className="font-medium text-[#2A332D]">{dateTime}</p>
            </div>
          )}

          {guests && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Number of Guests</p>
              <p className="font-medium text-[#2A332D]">{guests}</p>
            </div>
          )}

          {email && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-[#2A332D]">{email}</p>
            </div>
          )}

          {location && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <p className="font-medium text-[#2A332D]">{location}</p>
            </div>
          )}

          {benefits && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-semibold text-purple-600 mb-1">Benefits</p>
              <p className="font-medium text-[#2A332D]">{benefits}</p>
              {benefitDetails && <p className="text-sm text-gray-500 mt-1">{benefitDetails}</p>}
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-gray-500 text-center">
            A confirmation email has been sent to {email || "your email address"}
          </p>
        </div>
      </div>
    </div>
  );
}
