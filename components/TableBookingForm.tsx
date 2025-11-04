"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface TimeSlotProps {
  time: string;
  active: boolean;
  onClick: () => void;
  glassEffect?: boolean;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, active, onClick, glassEffect = false }) => (
  <Button
    onClick={onClick}
    type="button"
    className={`
      flex-1 min-w-[70px] sm:min-w-[80px] md:min-w-[90px] 
      p-2 sm:p-2.5 md:p-3 
      text-center rounded-md shadow-sm transition-colors
      ${active 
        ? "bg-[#2A332D] text-white"
        : glassEffect
          ? "bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20"
          : "bg-white text-black hover:bg-[#2A332D]/10 border border-gray-200"
      }
    `}
  >
    <span className="font-medium text-xs sm:text-sm md:text-base">{time}</span>
  </Button>
);

interface Day {
  label: string;
  value: string;
}

interface TableBookingFormProps {
  variant?: "default" | "glass";
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function TableBookingForm({ 
  variant = "default", 
  showBackButton = false,
  onBack 
}: TableBookingFormProps) {
  const router = useRouter();
  const glassEffect = variant === "glass";

  const today = new Date();

  const days: Day[] = Array.from({ length: 8 }, (_, i) => {
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

  const guestsList: string[] = Array.from({ length: 15 }, (_, i) => `${i + 1} guest${i + 1 > 1 ? "s" : ""}`);

  const lunchTimeSlots: string[] = [
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "1:00 PM",
    "1:15 PM",
    "1:30 PM",
    "1:45 PM",
    "2:00 PM",
    "2:15 PM",
    "2:30 PM",
    "2:45 PM",
  ];

  const dinnerTimeSlots: string[] = [
    "6:00 PM",
    "6:15 PM",
    "6:30 PM",
    "6:45 PM",
    "7:00 PM",
    "7:15 PM",
    "7:30 PM",
    "7:45 PM",
    "8:00 PM",
    "8:15 PM",
    "8:30 PM",
    "8:45 PM",
    "9:00 PM",
    "9:15 PM",
    "9:30 PM",
    "9:45 PM",
  ];

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [meal, setMeal] = useState<"lunch" | "dinner">("lunch");
  const [showExtraSlots, setShowExtraSlots] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Get time slots based on meal selection
  const allTimeSlots = meal === "lunch" ? lunchTimeSlots : dinnerTimeSlots;
  const initialSlots = allTimeSlots.slice(0, 8);
  const extraSlots = allTimeSlots.slice(8);

  // Reset selected time when meal changes
  const handleMealChange = (newMeal: "lunch" | "dinner") => {
    setMeal(newMeal);
    setSelectedTime(""); // Reset selected time when meal changes
    setShowExtraSlots(false); // Reset extra slots visibility
  };

  const isProceedEnabled = selectedDate && guests && selectedTime;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProceedEnabled) {
      router.push(
        `/showDetails?title=Reservation Details&dateTime=${encodeURIComponent(
          `${selectedDate} at ${selectedTime}`,
        )}&location=${encodeURIComponent(
          "123 Forest Avenue Downtown District City, State 12345",
        )}&guests=${encodeURIComponent(guests)}`,
      );
    }
  };

  const formClassName = glassEffect
    ? "relative z-20 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg shadow-2xl w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6 text-base sm:text-lg"
    : "bg-white rounded-lg shadow-xl w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6 text-base sm:text-lg";

  const titleClassName = glassEffect
    ? "font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 text-white"
    : "font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 text-[#2A332D]";

  const labelClassName = glassEffect
    ? "text-xs sm:text-sm md:text-base font-medium text-white"
    : "text-xs sm:text-sm md:text-base font-medium text-[#2A332D]";

  const buttonClassName = glassEffect
    ? "w-full mt-2 sm:mt-3 h-11 sm:h-12 md:h-13 text-sm sm:text-base md:text-lg font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 !text-white"
    : "w-full mt-2 sm:mt-3 h-11 sm:h-12 md:h-13 text-sm sm:text-base md:text-lg font-semibold bg-[#2A332D] hover:bg-[#2A332D]/90 text-white";

  return (
    <form
      onSubmit={handleSubmit}
      className={formClassName}
    >
      <div className="flex  items-center justify-between mb-2 sm:mb-4">
        {showBackButton ? (
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className={`hover:bg-gray-100 rounded-full h-8 w-8 sm:h-10 sm:w-10 ${
              glassEffect ? "text-white hover:bg-white/20" : ""
            }`}
            onClick={onBack || (() => router.back())}
          >
            <X className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${glassEffect ? "text-white" : "text-[#2A332D]"}`} />
          </Button>
        ) : (
          <div />
        )}
        <h1 className={titleClassName}>
          Book Your Table
        </h1>
        {showBackButton ? <div className="h-8 w-8 sm:h-10 sm:w-10" /> : <div />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        <div className="space-y-1.5 sm:space-y-2">
          <label className={labelClassName}>Date</label>
          <Select onValueChange={setSelectedDate}>
            <SelectTrigger 
              className={`w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base ${
                glassEffect ? "bg-white/10 backdrop-blur-md border-white/20 text-white data-placeholder:text-white" : ""
              }`}
            >
              <Calendar className={`mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 ${glassEffect ? "text-white" : "text-muted-foreground"}`} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d.value} value={d.value} className="text-sm sm:text-base">
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className={labelClassName}>No. of guests</label>
          <Select onValueChange={setGuests}>
            <SelectTrigger 
              className={`w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base ${
                glassEffect ? "bg-white/10 backdrop-blur-md border-white/20 text-white data-placeholder:text-white" : ""
              }`}
            >
              <Users className={`mr-2 h-3.5 w-3.5 text-white sm:h-4 sm:w-4 `} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-48 sm:max-h-60">
              {guestsList.map((g) => (
                <SelectItem key={g} value={g} className="text-sm sm:text-base">
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 justify-center">
        <Button
          type="button"
          variant={meal === "lunch" ? "default" : "outline"}
          className={`flex-1 h-10 sm:h-11 md:h-12 text-sm sm:text-base font-medium ${
            meal === "lunch"
              ? "bg-[#2A332D] text-white hover:bg-[#2A332D]/90"
              : glassEffect
              ? "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
              : "bg-white text-black border border-gray-200 hover:bg-[#2A332D]/10"
          }`}
          style={glassEffect ? { opacity: 1, visibility: 'visible' } : undefined}
          onClick={() => handleMealChange("lunch")}
        >
          Lunch
        </Button>
        <Button
          type="button"
          variant={meal === "dinner" ? "default" : "outline"}
          className={`flex-1 h-10 sm:h-11 md:h-12 text-sm sm:text-base font-medium ${
            meal === "dinner"
              ? "bg-[#2A332D] text-white hover:bg-[#2A332D]/90"
              : glassEffect
              ? "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 "
              : "bg-white text-black border border-gray-200 hover:bg-[#2A332D]/10"
          }`}
          style={glassEffect ? { opacity: 1, visibility: 'visible' } : undefined}
          onClick={() => handleMealChange("dinner")}
        >
          Dinner
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 justify-items-center">
        {initialSlots.map((time) => (
          <TimeSlot 
            key={time} 
            time={time} 
            active={selectedTime === time} 
            onClick={() => setSelectedTime(time)}
            glassEffect={glassEffect}
          />
        ))}
        {showExtraSlots &&
          extraSlots.map((time) => (
            <TimeSlot 
              key={time} 
              time={time} 
              active={selectedTime === time} 
              onClick={() => setSelectedTime(time)}
              glassEffect={glassEffect}
            />
          ))}
      </div>

      {extraSlots.length > 0 && (
        <Button
          type="button"
          variant="link"
          className={`w-full text-center p-0 h-auto text-sm sm:text-base ${
            glassEffect ? "text-white hover:text-white/80" : ""
          }`}
          onClick={() => setShowExtraSlots(!showExtraSlots)}
        >
          {showExtraSlots ? "Hide extra slots" : "View extra slots"}
        </Button>
      )}

      <Button
        type="submit"
        className={buttonClassName}
        style={glassEffect ? { opacity: 1, visibility: 'visible' } : undefined}
        disabled={!isProceedEnabled}
      >
        Proceed to Book
      </Button>
    </form>
  );
}
