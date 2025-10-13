"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, Users, X } from "lucide-react"
import Navbar from "@/components/Navbar"

interface TimeSlotProps {
  time: string
  active: boolean
  onClick: () => void
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, active, onClick }) => (
  <Button
    onClick={onClick}
    className={`
      flex-1 min-w-[80px] p-2 sm:p-3 text-center rounded-md shadow-sm transition-colors
      ${active ? "bg-[var(--leaf)] text-white" : "bg-white text-black hover:bg-[var(--leaf)]/10"}
    `}
  >
    <span className="font-medium text-sm sm:text-base">{time}</span>
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
      label: d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" }),
      value: `${yyyy}-${mm}-${dd}`,
    }
  })

  const guestsList: string[] = Array.from({ length: 15 }, (_, i) => `${i + 1} guest${i + 1 > 1 ? "s" : ""}`)

  const allTimeSlots: string[] = [
    "12:00 PM","12:15 PM","12:30 PM","12:45 PM",
    "1:00 PM","1:15 PM","1:30 PM","1:45 PM",
    "2:00 PM","2:15 PM","2:30 PM","2:45 PM"
  ]

  const initialSlots = allTimeSlots.slice(0, 8)
  const extraSlots = allTimeSlots.slice(8)

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [guests, setGuests] = useState<string>("")
  const [meal, setMeal] = useState<"lunch" | "dinner">("lunch")
  const [showExtraSlots, setShowExtraSlots] = useState<boolean>(false)
  const [selectedTime, setSelectedTime] = useState<string>("")

  const isProceedEnabled = selectedDate && guests && selectedTime

  return (
    <div className="bg-[var(--leaf)] min-h-screen p-4 flex flex-col items-center justify-center">
      <Navbar />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-2xl p-4 sm:p-6 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
            <X className="h-8 w-8 text-[var(--leaf)]" />
          </Button>
          <h2 className="text-xl font-semibold flex-1 text-center sm:text-left">Book a table</h2>
        </div>

        {/* Date & Guests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Date</label>
            <Select onValueChange={setSelectedDate}>
              <SelectTrigger className="w-full">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select a date" />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">No. of guests</label>
            <Select onValueChange={setGuests}>
              <SelectTrigger className="w-full">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {guestsList.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Meal */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant={meal === "lunch" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setMeal("lunch")}
          >
            Lunch
          </Button>
          <Button
            variant={meal === "dinner" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setMeal("dinner")}
          >
            Dinner
          </Button>
        </div>

        {/* Time slots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
          {initialSlots.map((time) => (
            <TimeSlot key={time} time={time} active={selectedTime === time} onClick={() => setSelectedTime(time)} />
          ))}
          {showExtraSlots && extraSlots.map((time) => (
            <TimeSlot key={time} time={time} active={selectedTime === time} onClick={() => setSelectedTime(time)} />
          ))}
        </div>

        {extraSlots.length > 0 && (
          <Button
            variant="link"
            className="w-full text-center text-primary p-0 h-auto"
            onClick={() => setShowExtraSlots(!showExtraSlots)}
          >
            {showExtraSlots ? "Hide extra slots" : "View extra slots"}
          </Button>
        )}

        {/* Proceed button */}
        <Button
          className="w-full mt-2"
          disabled={!isProceedEnabled}
          onClick={() => alert(`Booking confirmed!\nDate: ${selectedDate}\nGuests: ${guests}\nTime: ${selectedTime}`)}
        >
          Proceed to Book
        </Button>
      </div>
    </div>
  )
}
