"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [eventType, setEventType] = useState("");
  const [otherEventType, setOtherEventType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    else if (name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = "Enter a valid email address";

    if (!number.trim()) newErrors.number = "Number is required";
    else if (!/^\d{10}$/.test(number.trim()))
      newErrors.number = "Enter a valid 10-digit number";

    if (!eventType) newErrors.eventType = "Select an event type";
    else if (eventType === "other" && !otherEventType.trim())
      newErrors.otherEventType = "Please specify the event type";

    if (!startDate) newErrors.startDate = "Start date is required";
    else {
      const start = new Date(startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (start < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
    }

    if (!endDate) newErrors.endDate = "End date is required";
    else {
      const end = new Date(endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (end < today) {
        newErrors.endDate = "End date cannot be in the past";
      }
      if (startDate && end < new Date(startDate)) {
        newErrors.endDate = "End date must be on or after start date";
      }
    }

    if (!guests) newErrors.guests = "Number of guests is required";
    else {
      const guestNum = parseInt(guests);
      if (isNaN(guestNum) || guestNum < 1) {
        newErrors.guests = "Enter a valid number of guests";
      } else if (guestNum > 200) {
        newErrors.guests = "Maximum 200 guests allowed";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalEventType = eventType === "other" ? otherEventType : eventType;
    const dateRange = startDate === endDate 
      ? startDate 
      : `${startDate} to ${endDate}`;

    router.push(
      `/showDetails?title=Event Booking Summary&dateTime=${encodeURIComponent(
        dateRange
      )}&location=${encodeURIComponent(finalEventType)}&guests=${encodeURIComponent(
        guests
      )}&email=${encodeURIComponent(email)}&notes=${encodeURIComponent(notes)}`
    );
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/images/bookYourTable.JPG')] bg-top bg-cover" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_100%)] opacity-40 pointer-events-none" />
      
      {/* Content */}
      <div className="relative min-h-screen text-[var(--muted)] flex flex-col items-start justify-start p-4 lg:ml-24 sm:p-6 md:p-8">
        <Navbar />

        <form
          onSubmit={handleSubmit}
          className="rounded-lg text-[var(--muted)] sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5 lg:mt-24 p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6 mt-20 bg-black/30 backdrop-blur-sm"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 flex items-center gap-2">
            <X className="w-5 h-5 sm:w-6 sm:h-6" /> Book Your Event
          </h2>

          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <Label htmlFor="name" className="text-sm sm:text-base">
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`h-10 sm:h-11 md:h-12 text-sm sm:text-base ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <Label htmlFor="email" className="text-sm sm:text-base">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-10 sm:h-11 md:h-12 text-sm sm:text-base ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label htmlFor="number" className="text-sm sm:text-base">
              Phone Number *
            </Label>
            <Input
              id="number"
              type="tel"
              placeholder="Enter your phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={`h-10 sm:h-11 md:h-12 text-sm sm:text-base ${
                errors.number ? "border-red-500" : ""
              }`}
            />
            {errors.number && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.number}
              </p>
            )}
          </div>

          {/* Type of Event */}
          <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
            <Label htmlFor="eventType" className="text-sm sm:text-base">
              Type of Event *
            </Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger
                id="eventType"
                className={`h-10 sm:h-11 md:h-12 text-sm sm:text-base w-full ${
                  errors.eventType ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="birthday">Birthday</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.eventType && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.eventType}
              </p>
            )}
            
            {/* Other Event Type Input */}
            {eventType === "other" && (
              <div className="flex flex-col gap-1.5 sm:gap-2 mt-2">
                <Label htmlFor="otherEventType" className="text-sm sm:text-base">
                  Please specify event type *
                </Label>
                <Input
                  id="otherEventType"
                  type="text"
                  placeholder="Enter event type"
                  value={otherEventType}
                  onChange={(e) => setOtherEventType(e.target.value)}
                  className={`h-10 sm:h-11 md:h-12 text-sm sm:text-base ${
                    errors.otherEventType ? "border-red-500" : ""
                  }`}
                />
                {errors.otherEventType && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.otherEventType}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Start and End Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
              <Label htmlFor="startDate" className="text-sm sm:text-base">
                Start Date *
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                min={todayString}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  // If end date is before new start date, clear it
                  if (endDate && e.target.value && new Date(endDate) < new Date(e.target.value)) {
                    setEndDate("");
                  }
                }}
                className={`h-10 sm:h-11 md:h-12 text-sm sm:text-base w-full ${
                  errors.startDate ? "border-red-500" : ""
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.startDate}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
              <Label htmlFor="endDate" className="text-sm sm:text-base">
                End Date *
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                min={startDate || todayString}
                onChange={(e) => setEndDate(e.target.value)}
                className={`h-10 sm:h-11 md:h-12 text-sm sm:text-base w-full ${
                  errors.endDate ? "border-red-500" : ""
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.endDate}
                </p>
              )}
            </div>
          </div>

          {/* Number of Guests */}
          <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
            <Label htmlFor="guests" className="text-sm sm:text-base">
              Number of Guests *
            </Label>
            <Input
              id="guests"
              type="number"
              min="1"
              max="200"
              placeholder="Enter number of guests (max 200)"
              value={guests}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 200)) {
                  setGuests(value);
                }
              }}
              className={`h-10 sm:h-11 md:h-12 text-sm sm:text-base w-full ${
                errors.guests ? "border-red-500" : ""
              }`}
            />
            {errors.guests && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.guests}
              </p>
            )}
            <p className="text-xs text-white/60">
              Maximum 200 guests allowed
            </p>
          </div>

          {/* Notes about Event */}
          <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
            <Label htmlFor="notes" className="text-sm sm:text-base">
              Notes about Event
            </Label>
            <Textarea
              id="notes"
              placeholder="Tell us more about your event, special requirements, dietary restrictions, or any other details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className={`text-sm sm:text-base resize-none ${
                errors.notes ? "border-red-500" : ""
              }`}
            />
            {errors.notes && (
              <p className="text-red-500 text-xs sm:text-sm">
                {errors.notes}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="mt-2 sm:mt-4 w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
