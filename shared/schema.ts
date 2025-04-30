import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Event categories
export enum EventCategory {
  PERFORMANCE = "Performance",
  HEALING = "Healing",
  WORKSHOP = "Workshop"
}

// Event schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  category: text("category").notNull().$type<EventCategory>(),
  imageUrl: text("image_url"),
  location: text("location").notNull(),
  price: text("price"),
  ticketUrl: text("ticket_url"),
  isFeatured: integer("is_featured").default(0),
  tags: jsonb("tags").$type<string[]>().default([]),
});

// Insert schema for events
export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Event validation schema with extended validation
export const eventValidationSchema = insertEventSchema.extend({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  category: z.nativeEnum(EventCategory),
});
