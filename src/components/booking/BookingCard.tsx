"use client";

import { ArrowRight, Check } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IDestination } from "@/lib/types/destinations";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "@/components/ui/toast";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({ destination }: { destination: IDestination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // console.log(destination)

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const departureDate = form.departureDate.value

    try {
      const data = {
        username: user?.name,
        email: user?.email,
        image: user?.image,
        // Exclude the destination's `_id` so MongoDB can generate a unique
        // booking `_id`; otherwise re-booking a destination fails with a
        // duplicate-key (E11000) error.
        destinationId: destination._id,
        name: destination.name,
        country: destination.country,
        category: destination.category,
        price: destination.price,
        duration: destination.duration,
        imageUrl: destination.imageUrl,
        description: destination.description,
        departureDate: departureDate,
        bookingDate: new Date()
      }

      const token = await getTokenFromClient()

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      if (!res.ok) {
        let detail = "Something went wrong while creating your booking. Please try again."
        try {
          const errorRes = await res.json()
          if (errorRes?.msg || errorRes?.message) detail = errorRes.msg ?? errorRes.message
        } catch {
          // Server sent a non-JSON error body; keep the default message.
        }
        toast.add({
          title: "Booking failed",
          description: detail,
          type: "error",
        })
        return
      }

      toast.add({
        title: "Booking confirmed",
        description: `Your trip to ${destination.name} has been booked successfully.`,
        type: "success",
      })

      redirect("/my-bookings")
    } catch (error) {
      toast.add({
        title: "Booking failed",
        description: error instanceof Error ? error.message : "Network error. Check that the API server is running and try again.",
        type: "error",
      })
    }
  }

  return (
    <aside className="h-fit rounded-sm border border-border p-5">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-semibold text-[#00A8E8]">
        ${destination.price}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">per person</p>
    <form onSubmit={handleBooking}>
      <Input
        type="date"
        name="departureDate"
        aria-label="Departure date"
        defaultValue={destination.departureDate}
        className="mt-4"
      />

      <Button type="submit" className="mt-4 w-full bg-[#00A8E8] text-white hover:bg-[#0095d1]">
        Book Now
        <ArrowRight />
      </Button>

      </form>

      <ul className="mt-5 space-y-3 border-t border-border pt-5">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Check className="size-4 shrink-0 text-green-600" />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BookingCard;