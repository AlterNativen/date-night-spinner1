import { 
  users, 
  dateOptions, 
  subscriptions,
  type User, 
  type InsertUser,
  type DateOption,
  type InsertDateOption,
  type Subscription,
  type InsertSubscription
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllDateOptions(): Promise<DateOption[]>;
  createDateOption(option: InsertDateOption): Promise<DateOption>;
  updateDateOption(id: number, option: Partial<InsertDateOption>): Promise<DateOption | undefined>;
  deleteDateOption(id: number): Promise<boolean>;
  
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptionByEmail(email: string): Promise<Subscription | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private dateOptions: Map<number, DateOption>;
  private subscriptions: Map<number, Subscription>;
  private currentUserId: number;
  private currentDateOptionId: number;
  private currentSubscriptionId: number;

  constructor() {
    this.users = new Map();
    this.dateOptions = new Map();
    this.subscriptions = new Map();
    this.currentUserId = 1;
    this.currentDateOptionId = 1;
    this.currentSubscriptionId = 1;
    
    // Initialize with default date options
    this.initializeDefaultOptions();
  }

  private initializeDefaultOptions() {
    const defaultOptions = [
      { label: 'Movie Night', weight: 1, color: '#D4A574', isDefault: true },
      { label: 'Candlelight Dinner', weight: 1, color: '#E8C5A0', isDefault: true },
      { label: 'Board Game & Wine', weight: 1, color: '#C8956D', isDefault: true },
      { label: 'Stargazing', weight: 1, color: '#B8926A', isDefault: true },
      { label: 'Cook Together', weight: 1, color: '#DBA995', isDefault: true }
    ];

    defaultOptions.forEach(option => {
      const id = this.currentDateOptionId++;
      const dateOption: DateOption = { 
        id, 
        label: option.label,
        weight: option.weight,
        color: option.color,
        isDefault: option.isDefault 
      };
      this.dateOptions.set(id, dateOption);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllDateOptions(): Promise<DateOption[]> {
    return Array.from(this.dateOptions.values());
  }

  async createDateOption(insertOption: InsertDateOption): Promise<DateOption> {
    const id = this.currentDateOptionId++;
    const option: DateOption = { 
      id, 
      label: insertOption.label,
      weight: insertOption.weight,
      color: insertOption.color,
      isDefault: false 
    };
    this.dateOptions.set(id, option);
    return option;
  }

  async updateDateOption(id: number, updateData: Partial<InsertDateOption>): Promise<DateOption | undefined> {
    const existing = this.dateOptions.get(id);
    if (!existing) return undefined;
    
    const updated: DateOption = { ...existing, ...updateData };
    this.dateOptions.set(id, updated);
    return updated;
  }

  async deleteDateOption(id: number): Promise<boolean> {
    return this.dateOptions.delete(id);
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = this.currentSubscriptionId++;
    const subscription: Subscription = { ...insertSubscription, id };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async getSubscriptionByEmail(email: string): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(
      (sub) => sub.email === email,
    );
  }
}

export const storage = new MemStorage();
