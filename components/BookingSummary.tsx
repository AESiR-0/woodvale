// BookingSummary.tsx
"use client";


interface BookingSummaryProps {
  title: string;
  dateTime: string;
  location?: string;
  guests: string;
  benefits?: string;
  benefitDetails?: string;
}

export default function BookingSummary({
  title,
  dateTime,
  location,
  guests,
  benefits,
  benefitDetails,
}: BookingSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

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
        <div className="mt-2">
          <p className="text-sm font-semibold text-purple-600">Benefits</p>
          <p className="font-medium">{benefits}</p>
          {benefitDetails && <p className="text-sm text-gray-500">{benefitDetails}</p>}
        </div>
      )}
    </div>
  );
}
