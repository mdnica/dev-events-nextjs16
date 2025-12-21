import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase();

  const { slug } = await params;

  const event = await Event.findOne({ slug });

  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  return NextResponse.json({ event }, { status: 200 });
}
