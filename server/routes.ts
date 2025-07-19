import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDateOptionSchema, insertSubscriptionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all date options
  app.get("/api/date-options", async (req, res) => {
    try {
      const options = await storage.getAllDateOptions();
      res.json(options);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch date options" });
    }
  });

  // Create a new date option
  app.post("/api/date-options", async (req, res) => {
    try {
      const validatedData = insertDateOptionSchema.parse(req.body);
      const option = await storage.createDateOption(validatedData);
      res.status(201).json(option);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create date option" });
      }
    }
  });

  // Update a date option
  app.patch("/api/date-options/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertDateOptionSchema.partial().parse(req.body);
      const option = await storage.updateDateOption(id, validatedData);
      
      if (!option) {
        res.status(404).json({ message: "Date option not found" });
        return;
      }
      
      res.json(option);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update date option" });
      }
    }
  });

  // Delete a date option
  app.delete("/api/date-options/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteDateOption(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Date option not found" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete date option" });
    }
  });

  // Create a newsletter subscription
  app.post("/api/subscriptions", async (req, res) => {
    try {
      const validatedData = insertSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getSubscriptionByEmail(validatedData.email);
      if (existing) {
        res.status(409).json({ message: "Email already subscribed" });
        return;
      }
      
      const subscription = await storage.createSubscription(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create subscription" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
