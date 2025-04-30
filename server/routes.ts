import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { eventValidationSchema, EventCategory } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route("/api");
  
  // Get all events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Get featured event
  app.get("/api/events/featured", async (req, res) => {
    try {
      const featuredEvent = await storage.getFeaturedEvent();
      if (featuredEvent) {
        res.json(featuredEvent);
      } else {
        res.status(404).json({ message: "No featured event found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured event" });
    }
  });

  // Get upcoming events with optional limit
  app.get("/api/events/upcoming", async (req, res) => {
    try {
      const limitSchema = z.object({
        limit: z.string().optional().transform(val => val ? parseInt(val) : undefined),
      });
      
      const { limit } = limitSchema.parse(req.query);
      const events = await storage.getUpcomingEvents(limit);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch upcoming events" });
    }
  });

  // Get events by category
  app.get("/api/events/category/:category", async (req, res) => {
    try {
      const categorySchema = z.object({
        category: z.nativeEnum(EventCategory),
      });
      
      const { category } = categorySchema.parse(req.params);
      const events = await storage.getEventsByCategory(category);
      res.json(events);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid category" });
      } else {
        res.status(500).json({ message: "Failed to fetch events by category" });
      }
    }
  });

  // Get event by ID
  app.get("/api/events/:id", async (req, res) => {
    try {
      const idSchema = z.object({
        id: z.string().transform(val => parseInt(val)),
      });
      
      const { id } = idSchema.parse(req.params);
      const event = await storage.getEventById(id);
      
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event ID" });
      } else {
        res.status(500).json({ message: "Failed to fetch event" });
      }
    }
  });

  // Create event
  app.post("/api/events", async (req, res) => {
    try {
      const eventData = eventValidationSchema.parse(req.body);
      const newEvent = await storage.createEvent(eventData);
      res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create event" });
      }
    }
  });

  // Update event
  app.patch("/api/events/:id", async (req, res) => {
    try {
      const idSchema = z.object({
        id: z.string().transform(val => parseInt(val)),
      });
      
      const { id } = idSchema.parse(req.params);
      const updateData = eventValidationSchema.partial().parse(req.body);
      
      const updatedEvent = await storage.updateEvent(id, updateData);
      if (updatedEvent) {
        res.json(updatedEvent);
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update event" });
      }
    }
  });

  // Delete event
  app.delete("/api/events/:id", async (req, res) => {
    try {
      const idSchema = z.object({
        id: z.string().transform(val => parseInt(val)),
      });
      
      const { id } = idSchema.parse(req.params);
      const success = await storage.deleteEvent(id);
      
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Event not found" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid event ID" });
      } else {
        res.status(500).json({ message: "Failed to delete event" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
