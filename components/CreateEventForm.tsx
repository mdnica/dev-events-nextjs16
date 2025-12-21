"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateEventForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    overview: "",
    venue: "",
    location: "",
    date: "",
    time: "",
    mode: "online",
    audience: "",
    organizer: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [agenda, setAgenda] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addTag(tag: string) {
    if (tag && !tags.includes(tag)) setTags((prev) => [...prev, tag]);
  }

  function addAgenda(item: string) {
    if (item && !agenda.includes(item)) setAgenda((prev) => [...prev, item]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      formData.append("tags", JSON.stringify(tags));
      formData.append("agenda", JSON.stringify(agenda));

      if (image) formData.append("image", image);

      const response = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log(data);

      toast.success("Event created!");

      // OPTIONAL: redirect to events page
      window.location.href = "/events";
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        onChange={handleChange}
        className="input"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="input"
        required
      />

      <textarea
        name="overview"
        placeholder="Overview"
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="venue"
        placeholder="Venue"
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="date"
        name="date"
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="time"
        name="time"
        onChange={handleChange}
        className="input"
        required
      />

      <select name="mode" onChange={handleChange} className="input">
        <option value="online">Online</option>
        <option value="offline">Offline</option>
        <option value="hybrid">Hybrid</option>
      </select>

      <input
        type="text"
        name="audience"
        placeholder="Audience"
        onChange={handleChange}
        className="input"
        required
      />

      <input
        type="text"
        name="organizer"
        placeholder="Organizer"
        onChange={handleChange}
        className="input"
        required
      />

      {/* Tags */}
      <div>
        <input
          type="text"
          placeholder="Add tag"
          onKeyDown={(e) =>
            e.key === "Enter" &&
            (e.preventDefault(),
            addTag(e.currentTarget.value),
            (e.currentTarget.value = ""))
          }
          className="input"
        />
        <div className="flex gap-2 mt-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-700 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Agenda */}
      <div>
        <input
          type="text"
          placeholder="Add agenda item"
          onKeyDown={(e) =>
            e.key === "Enter" &&
            (e.preventDefault(),
            addAgenda(e.currentTarget.value),
            (e.currentTarget.value = ""))
          }
          className="input"
        />
        <ul className="list-disc ml-6 text-gray-300">
          {agenda.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Image upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="input"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
}
