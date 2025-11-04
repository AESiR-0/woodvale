"use client";

import Navbar from "@/components/Navbar";
import TableBookingForm from "@/components/TableBookingForm";

export default function BookingPage() {
  return (
    <div className="bg-[#2A332D] min-h-screen px-3 py-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
      <Navbar />
      <div className="mt-16  sm:mt-20">
        <TableBookingForm variant="default" showBackButton={true} />
      </div>
    </div>
  );
}
