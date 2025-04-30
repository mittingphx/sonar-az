import { Event, EventCategory } from "@shared/schema";

// Re-export types from schema for frontend use
export type { Event };
export { EventCategory };

// Additional frontend-specific types
export interface CalendarEvent extends Event {
  eventDate: Date;
}

export type CategoryColor = {
  bg: string;
  text: string;
};

export type CategoryColorMap = {
  [key in EventCategory]: CategoryColor;
};

export const CATEGORY_COLORS: CategoryColorMap = {
  [EventCategory.PERFORMANCE]: {
    bg: "bg-pink",
    text: "text-white"
  },
  [EventCategory.HEALING]: {
    bg: "bg-lavender",
    text: "text-darkgray"
  },
  [EventCategory.WORKSHOP]: {
    bg: "bg-teal",
    text: "text-white"
  }
};
