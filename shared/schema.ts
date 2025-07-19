import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const dateOptions = pgTable("date_options", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  weight: integer("weight").notNull().default(1),
  color: text("color").notNull().default("#DEB887"),
  isDefault: boolean("is_default").default(false),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDateOptionSchema = createInsertSchema(dateOptions).pick({
  label: true,
  weight: true,
  color: true,
}).required();

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  name: true,
  email: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDateOption = z.infer<typeof insertDateOptionSchema>;
export type DateOption = typeof dateOptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
