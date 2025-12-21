import Link from "next/link";
import { IEvent } from "@/database";

export default function EventCard(event: IEvent) {
  const { title, image, date, mode, slug, venue } = event;

  return (
    <Link
      href={`/events/${slug}`}
      className="block bg-gray-900 rounded-lg overflow-hidden shadow hover:scale-[1.02] transition"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-gray-400 mt-1">
          {date} • {mode}
        </p>
        <p className="text-gray-500 text-sm">{venue}</p>
      </div>
    </Link>
  );
}
