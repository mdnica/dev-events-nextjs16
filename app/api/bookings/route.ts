import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { eventId, email } = await req.json();

    if (!eventId || !email) {
      return NextResponse.json(
        { message: "eventId and email are required" },
        { status: 400 }
      );
    }

    const booking = await Booking.create({ eventId, email });

    return NextResponse.json(
      { message: "Booking successful", booking },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
