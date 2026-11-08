"use client"

import { Card } from "../ui/card";
import Image from "next/image";
import { Calendar, Eye, Ticket, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { IBooking } from "@/lib/types/booking";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { toast } from "@/components/ui/toast";

const MyBookingCard = ({ booking }: { booking: IBooking }) => {

  // "View" links straight to the destination details page (all new bookings
  // store the destination they were created from). Rendered as a real <Link>
  // so navigation works even before React hydration finishes.
  const viewHref = booking.destinationId
    ? `/destinations/${booking.destinationId}`
    : "/destinations"

 const handleCancleBooking = async() => {
    const token = await getTokenFromClient()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`, {
        method:'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
      toast.add({
        title: "Cancellation failed",
        description: "Something went wrong while cancelling your booking. Please try again.",
        type: "error",
      })
      return
    }

    toast.add({
      title: "Booking cancelled",
      description: `Your trip to ${booking.name} has been cancelled.`,
      type: "success",
    })

    redirect('/my-bookings')
 }
    return (
    <Card
      key={booking._id}
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-75 h-50  shrink-0 relative">
          <Image
            height={400}
            width={400}
            src={booking.imageUrl}
            alt={booking.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
          {/* Top section: Status & Details */}
          <div>
            <h2 className="text-2xl font-medium text-slate-900">
              {booking.name}
            </h2>

            <div className="mt-3 space-y-1.5 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Departure: {booking.departureDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                <span>Booking ID: {booking._id}</span>
              </div>
            </div>

            <div className="mt-4 text-2xl font-medium text-blue-500">
              ${booking.price}
            </div>
          </div>

          {/* Bottom section: Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
            onClick={handleCancleBooking}
              variant="outline"
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 gap-2"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </Button>
            <Link
              href={viewHref}
              className="inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-[min(var(--radius-md),12px)] bg-blue-600 px-2.5 text-[0.8rem] font-medium text-white outline-none select-none transition-all hover:bg-blue-700 focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg:not([class*='size-'])]:size-3.5"
            >
              <Eye className="w-3.5 h-3.5 shrink-0 pointer-events-none" />
              View
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MyBookingCard;