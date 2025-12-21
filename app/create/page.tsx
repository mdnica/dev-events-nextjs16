"use client";

import CreateEventForm from "@/components/CreateEventForm";

export default function CreatePage() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      <CreateEventForm />
    </main>
  );
}
