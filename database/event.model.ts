import { Schema, model, models, Document } from "mongoose";

// -----------------------------------------------------
// 1. TypeScript Interface
// -----------------------------------------------------
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  startDateTime: Date;
  endDateTime: Date;
  mode: "online" | "offline" | "hybrid";
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// -----------------------------------------------------
// 2. Helper Functions
// -----------------------------------------------------
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// -----------------------------------------------------
// 3. Schema Definition
// -----------------------------------------------------
const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },

    overview: {
      type: String,
      required: true,
      maxlength: 500,
    },

    image: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    startDateTime: {
      type: Date,
      required: [true, "Start date/time is required"],
    },

    endDateTime: {
      type: Date,
      required: [true, "End date/time is required"],
    },

    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },

    audience: {
      type: String,
      required: true,
      trim: true,
    },

    agenda: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "At least one agenda item is required",
      },
    },

    organizer: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "At least one tag is required",
      },
    },
  },
  { timestamps: true }
);

// -----------------------------------------------------
// 4. Hooks
// -----------------------------------------------------

// Pre-save (runs on .save())
EventSchema.pre("save", function (next) {
  const event = this as Event;

  if (event.isModified("title") || event.isNew) {
    const baseSlug = generateSlug(event.title);
    event.slug = `${baseSlug}-${event._id.toString().slice(-6)}`;
  }

  // Ensure end time is after start time
  if (event.startDateTime >= event.endDateTime) {
    return next(new Error("End date/time must be after start date/time"));
  }

  next();
});

// Pre-update (for findOneAndUpdate)
EventSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Partial<IEvent> & { title?: string };

  if (update?.title) {
    update.slug = `${generateSlug(update.title)}-${Date.now().toString(36)}`;
    this.setUpdate(update);
  }

  next();
});

// 5. Indexes

// query speed for event pages
EventSchema.index({ slug: 1 }, { unique: true });

// Fast filtering by date or mode
EventSchema.index({ startDateTime: 1 });
EventSchema.index({ mode: 1 });

// Combined query performance
EventShema.index({ startDateTime: 1, mode: 1 });

// Full-text search for title/description
EventSchema.index({ title: "text", descsription: "text", overview: "text" });

// 6. Model export
const Event = models.Event || model<IEvent>("Event", EventSchema);
export default Event;
