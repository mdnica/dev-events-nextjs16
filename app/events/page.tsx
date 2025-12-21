import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export default async function EventsPage() {
  "use cache";
  cacheLife("hours");

  const response = await fetch(`${BASE_URL}/api/events`, {
    cache: "no-store",
  });

  const { events } = await response.json();

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">All Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((event: IEvent) => (
            <EventCard key={event._id} {...event} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </main>
  );
}
