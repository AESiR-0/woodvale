"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EventBookingForm() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [eventType, setEventType] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [guests, setGuests] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return {
      label: d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      value: `${yyyy}-${mm}-${dd}`,
    };
  });

  const guestsList = Array.from(
    { length: 15 },
    (_, i) => `${i + 1} guest${i + 1 > 1 ? "s" : ""}`
  );

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!number.trim()) newErrors.number = "Number is required";
    else if (!/^\d{10}$/.test(number.trim()))
      newErrors.number = "Enter a valid 10-digit number";

    if (!eventType) newErrors.eventType = "Select an event type";

    if (dates.length === 0) newErrors.dates = "Select at least one date";

    if (!guests) newErrors.guests = "Select number of guests";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    router.push(
      `/showDetails?title=Event Booking Summary&dateTime=${encodeURIComponent(
        dates.join(", ")
      )}&location=${encodeURIComponent(eventType)}&guests=${encodeURIComponent(
        guests
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-[var(--leaf)] flex flex-col items-center justify-center p-4">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5 p-6 flex flex-col gap-6"
      >
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <X /> Book Your Event
        </h2>

        {/* Name & Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="number">Number</Label>
            <Input
              id="number"
              type="tel"
              placeholder="Enter your number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={errors.number ? "border-red-500" : ""}
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number}</p>
            )}
          </div>
        </div>

        {/* Event Type & Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="eventType">Type of Event</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger
                id="eventType"
                className={errors.eventType ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
              </SelectContent>
            </Select>
            {errors.eventType && (
              <p className="text-red-500 text-sm">{errors.eventType}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="dates">Dates</Label>
            <Select
              value=""
              onValueChange={(val) =>
                setDates((prev) => (prev.includes(val) ? prev : [...prev, val]))
              }
            >
              <SelectTrigger
                id="dates"
                className={errors.dates ? "border-red-500" : ""}
              >
                <SelectValue
                  placeholder={
                    dates.length > 0 ? dates.join(", ") : "Select date(s)"
                  }
                />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {days.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label} {dates.includes(d.value) ? "✓" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.dates && (
              <p className="text-red-500 text-sm">{errors.dates}</p>
            )}
          </div>
        </div>

        {/* Number of Guests */}
        <div className="flex flex-col gap-1 w-full md:w-1/2">
          <Label htmlFor="guests">Number of Guests</Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger
              id="guests"
              className={errors.guests ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {guestsList.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.guests && (
            <p className="text-red-500 text-sm">{errors.guests}</p>
          )}
        </div>

        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
