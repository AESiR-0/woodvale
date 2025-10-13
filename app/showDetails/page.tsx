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
  const benefits = searchParams.get("benefits") || "";
  const benefitDetails = searchParams.get("benefitDetails") || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--leaf)] p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <div className="mb-3">
          <p className="text-sm text-gray-500">Date & Time</p>
          <p className="font-medium">{dateTime}</p>
        </div>

        {location && (
          <div className="mb-3">
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{location}</p>
          </div>
        )}

        <div className="mb-3">
          <p className="text-sm text-gray-500">Number of guest(s)</p>
          <p className="font-medium">{guests}</p>
        </div>

        {benefits && (
          <div className="mt-3">
            <p className="text-sm font-semibold text-purple-600">Benefits</p>
            <p className="font-medium">{benefits}</p>
            {benefitDetails && <p className="text-sm text-gray-500">{benefitDetails}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
