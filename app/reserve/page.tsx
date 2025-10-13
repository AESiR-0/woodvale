"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Users, X } from "lucide-react"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"

interface TimeSlotProps {
  time: string
  active: boolean
  onClick: () => void
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, active, onClick }) => (
  <Button
    onClick={onClick}
    className={`
      flex-1 min-w-[70px] sm:min-w-[80px] md:min-w-[90px] 
      p-2 sm:p-2.5 md:p-3 
      text-center rounded-md shadow-sm transition-colors
      ${active ? "bg-[#2A332D] text-white" : "bg-white text-black hover:bg-[#2A332D]/10 border border-gray-200"}
    `}
  >
    <span className="font-medium text-xs sm:text-sm md:text-base">{time}</span>
  </Button>
)

interface Day {
  label: string
  value: string
}

export default function BookingPage() {
  const today = new Date()

  const days: Day[] = Array.from({ length: 8 }, (_, i) => {
    const d = new Date()
    d.setDate(today.getDate() + i)

    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")

    return {
      label: d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      value: `${yyyy}-${mm}-${dd}`,
    }
  })

  const guestsList: string[] = Array.from({ length: 15 }, (_, i) => `${i + 1} guest${i + 1 > 1 ? "s" : ""}`)

  const allTimeSlots: string[] = [
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
  ]

  const initialSlots = allTimeSlots.slice(0, 8)
  const extraSlots = allTimeSlots.slice(8)
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [guests, setGuests] = useState<string>("")
  const [meal, setMeal] = useState<"lunch" | "dinner">("lunch")
  const [showExtraSlots, setShowExtraSlots] = useState<boolean>(false)
  const [selectedTime, setSelectedTime] = useState<string>("")

  const isProceedEnabled = selectedDate && guests && selectedTime

  return (
    <div className="bg-[#2A332D] min-h-screen px-3 py-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
      <Navbar />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[95%] sm:max-w-md md:max-w-lg lg:max-w-2xl p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6 mt-16 sm:mt-20">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 rounded-full h-8 w-8 sm:h-10 sm:w-10"
            onClick={() => router.back()}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#2A332D]" />
          </Button>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex-1 text-center">Book a table</h2>
          <div className="h-8 w-8 sm:h-10 sm:w-10" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-xs sm:text-sm md:text-base font-medium">Date</label>
            <Select onValueChange={setSelectedDate}>
              <SelectTrigger className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base">
                <Calendar className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <SelectValue placeholder="Select a date" />
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
            <label className="text-xs sm:text-sm md:text-base font-medium">No. of guests</label>
            <Select onValueChange={setGuests}>
              <SelectTrigger className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base">
                <Users className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                <SelectValue placeholder="Select guests" />
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

        <div className="flex flex-row gap-2 sm:gap-3 md:gap-4">
          <Button
            variant={meal === "lunch" ? "default" : "outline"}
            className="flex-1 h-10 sm:h-11 md:h-12 text-sm sm:text-base font-medium"
            onClick={() => setMeal("lunch")}
          >
            Lunch
          </Button>
          <Button
            variant={meal === "dinner" ? "default" : "outline"}
            className="flex-1 h-10 sm:h-11 md:h-12 text-sm sm:text-base font-medium"
            onClick={() => setMeal("dinner")}
          >
            Dinner
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {initialSlots.map((time) => (
            <TimeSlot key={time} time={time} active={selectedTime === time} onClick={() => setSelectedTime(time)} />
          ))}
          {showExtraSlots &&
            extraSlots.map((time) => (
              <TimeSlot key={time} time={time} active={selectedTime === time} onClick={() => setSelectedTime(time)} />
            ))}
        </div>

        {extraSlots.length > 0 && (
          <Button
            variant="link"
            className="w-full text-center text-primary p-0 h-auto text-sm sm:text-base"
            onClick={() => setShowExtraSlots(!showExtraSlots)}
          >
            {showExtraSlots ? "Hide extra slots" : "View extra slots"}
          </Button>
        )}

        <Button
          className="w-full mt-2 sm:mt-3 h-11 sm:h-12 md:h-13 text-sm sm:text-base md:text-lg font-semibold"
          disabled={!isProceedEnabled}
          onClick={() =>
            router.push(
              `/showDetails?title=Reservation Details&dateTime=${encodeURIComponent(
                `${selectedDate} at ${selectedTime}`,
              )}&location=${encodeURIComponent(
                "123 Forest Avenue Downtown District City, State 12345",
              )}&guests=${encodeURIComponent(guests)}`,
            )
          }
        >
          Proceed to Book
        </Button>
      </div>
    </div>
  )
}
