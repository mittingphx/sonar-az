import { events, type Event, type InsertEvent, EventCategory } from "@shared/schema";
import { readFileSync } from "fs";
import path from "path";

// Interface for storage operations
export interface IStorage {
  getAllEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event | undefined>;
  getFeaturedEvent(): Promise<Event | undefined>;
  getEventsByCategory(category: EventCategory): Promise<Event[]>;
  getUpcomingEvents(limit?: number): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private events: Map<number, Event>;
  private currentId: number;

  constructor() {
    this.events = new Map();
    this.currentId = 1;
    this.loadInitialData();
  }

  private loadInitialData() {
    try {
      const dataPath = path.join(process.cwd(), "data", "events.json");
      const eventsData = JSON.parse(readFileSync(dataPath, "utf-8"));
      
      for (const event of eventsData) {
        const newEvent: Event = {
          ...event,
          id: this.currentId++
        };
        this.events.set(newEvent.id, newEvent);
      }
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEventById(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getFeaturedEvent(): Promise<Event | undefined> {
    return Array.from(this.events.values()).find(event => event.isFeatured === 1);
  }

  async getEventsByCategory(category: EventCategory): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      event => event.category === category
    );
  }

  async getUpcomingEvents(limit?: number): Promise<Event[]> {
    const now = new Date();
    const upcomingEvents = Array.from(this.events.values())
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return limit ? upcomingEvents.slice(0, limit) : upcomingEvents;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: number, eventUpdate: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) return undefined;

    const updatedEvent = { ...existingEvent, ...eventUpdate };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }
}

// Export the storage instance
export const storage = new MemStorage();
