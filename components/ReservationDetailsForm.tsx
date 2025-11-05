"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, Mail, User, Calendar, Clock, Users } from "lucide-react";

interface ReservationDetailsFormProps {
  selectedDate: string;
  selectedTime: string;
  numberOfGuests: number;
  onComplete: (data: ReservationFormData) => void;
  onBack: () => void;
  variant?: "default" | "glass";
}

export interface ReservationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  occasion?: string;
  specialRequests?: string;
  restaurantMarketingConsent: boolean;
  openTableMarketingConsent: boolean;
  textUpdatesConsent: boolean;
}

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+1", country: "Canada", flag: "🇨🇦" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
];

const occasions = [
  { value: "birthday", label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "business", label: "Business" },
  { value: "date", label: "Date" },
  { value: "celebration", label: "Celebration" },
  { value: "other", label: "Other" },
];

export default function ReservationDetailsForm({
  selectedDate,
  selectedTime,
  numberOfGuests,
  onComplete,
  onBack,
  variant = "default",
}: ReservationDetailsFormProps) {
  const glassEffect = variant === "glass";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [restaurantMarketingConsent, setRestaurantMarketingConsent] = useState(false);
  const [openTableMarketingConsent, setOpenTableMarketingConsent] = useState(false);
  const [textUpdatesConsent, setTextUpdatesConsent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10,15}$/.test(phone.trim().replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const formData: ReservationFormData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      phoneCountryCode,
      occasion: occasion || undefined,
      specialRequests: specialRequests.trim() || undefined,
      restaurantMarketingConsent,
      openTableMarketingConsent,
      textUpdatesConsent,
    };

    onComplete(formData);
  };

  const containerClassName = glassEffect
    ? "relative z-20 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg shadow-2xl w-full max-w-2xl p-6 sm:p-8 flex flex-col gap-6"
    : "bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 sm:p-8 flex flex-col gap-6";

  const labelClassName = glassEffect
    ? "text-sm font-medium text-white"
    : "text-sm font-medium text-[#2A332D]";

  const inputClassName = glassEffect
    ? "bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60"
    : "bg-white border-gray-300 text-[#071d18]";

  return (
    <form onSubmit={handleSubmit} className={containerClassName}>
      <div className="space-y-4">
        <h2 className={`text-2xl font-bold ${glassEffect ? "text-white" : "text-[#2A332D]"}`}>
          Complete Your Reservation
        </h2>

        {/* What to know before you go */}
        <div className={`p-4 rounded-lg ${glassEffect ? "bg-white/10 border border-white/20" : "bg-gray-50 border border-gray-200"}`}>
          <h3 className={`text-lg font-semibold mb-3 ${glassEffect ? "text-white" : "text-[#2A332D]"}`}>
            What to know before you go
          </h3>
          <div className={`text-sm space-y-2 ${glassEffect ? "text-white/90" : "text-gray-700"}`}>
            <p>
              <strong>Important dining information:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>We have a 15 minute grace period. Please call us if you are running later than 15 minutes after your reservation time.</li>
              <li>We may contact you about this reservation, so please ensure your email and phone number are up to date.</li>
              <li>
                Your table will be reserved for 2 hours for parties of up to 4; 2 hours 30 minutes for parties of up to 6; and 3 hours for parties of 7+.
              </li>
            </ul>
          </div>
        </div>

        {/* Reservation Summary */}
        <div className={`p-4 rounded-lg border ${glassEffect ? "bg-white/5 border-white/20" : "bg-gray-50 border-gray-200"}`}>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className={`mb-1 ${glassEffect ? "text-white/70" : "text-gray-500"}`}>Date & Time</p>
              <p className={`font-medium ${glassEffect ? "text-white" : "text-[#2A332D]"}`}>
                {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}
              </p>
            </div>
            <div>
              <p className={`mb-1 ${glassEffect ? "text-white/70" : "text-gray-500"}`}>Number of Guests</p>
              <p className={`font-medium ${glassEffect ? "text-white" : "text-[#2A332D]"}`}>{numberOfGuests}</p>
            </div>
          </div>
        </div>

        {/* Diner Details */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${glassEffect ? "text-white" : "text-[#2A332D]"}`}>
            Diner details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className={labelClassName}>
                First name *
              </Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`${inputClassName} ${errors.firstName ? "border-red-500" : ""}`}
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className={labelClassName}>
                Last name *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`${inputClassName} ${errors.lastName ? "border-red-500" : ""}`}
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className={labelClassName}>
              Phone number *
            </Label>
            <div className="flex gap-2">
              <Select value={phoneCountryCode} onValueChange={setPhoneCountryCode}>
                <SelectTrigger className={`w-32 ${inputClassName}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((cc, index) => (
                    <SelectItem key={`${cc.code}-${cc.country}-${index}`} value={cc.code}>
                      {cc.flag} {cc.code} ({cc.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className={`flex-1 ${inputClassName} ${errors.phone ? "border-red-500" : ""}`}
                placeholder="Phone number"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={labelClassName}>
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClassName} ${errors.email ? "border-red-500" : ""}`}
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="occasion" className={labelClassName}>
              Select an occasion (optional)
            </Label>
            <Select value={occasion} onValueChange={setOccasion}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder="Select an occasion" />
              </SelectTrigger>
              <SelectContent>
                {occasions.map((occ) => (
                  <SelectItem key={occ.value} value={occ.value}>
                    {occ.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests" className={labelClassName}>
              Add a special request (optional)
            </Label>
            <Textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className={`${inputClassName} min-h-[100px] resize-y`}
              placeholder="Any special requests or dietary restrictions..."
            />
          </div>
        </div>

        {/* Marketing Consents */}
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="restaurantMarketing"
              checked={restaurantMarketingConsent}
              onCheckedChange={(checked) => setRestaurantMarketingConsent(checked === true)}
            />
            <Label
              htmlFor="restaurantMarketing"
              className={`text-sm cursor-pointer leading-tight ${glassEffect ? "text-white/90" : "text-gray-700"}`}
            >
              Sign me up to receive dining offers and news from this restaurant by email.
            </Label>
          </div>

      

          <div className="flex items-start space-x-3">
            <Checkbox
              id="textUpdates"
              checked={textUpdatesConsent}
              onCheckedChange={(checked) => setTextUpdatesConsent(checked === true)}
            />
            <Label
              htmlFor="textUpdates"
              className={`text-sm cursor-pointer leading-tight ${glassEffect ? "text-white/90" : "text-gray-700"}`}
            >
              Yes, I want to get text updates and reminders about my reservations.
            </Label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className={`flex-1 ${glassEffect ? "border-white/20 text-white hover:bg-white/10" : ""}`}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 ${glassEffect ? "bg-white/20 hover:bg-white/30 text-white border border-white/30" : "bg-[#2A332D] hover:bg-[#2A332D]/90 text-white"} disabled:opacity-50`}
          >
            {isSubmitting ? "Completing..." : "Complete reservation"}
          </Button>
        </div>
      </div>
    </form>
  );
}

