import { Suspense } from "react";
import EventDetails from "./EventDetails";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="container mx-auto py-10">
      <Suspense fallback={<div>Loading event...</div>}>
        <EventDetails slug={slug} />
      </Suspense>
    </main>
  );
}
