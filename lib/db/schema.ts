import { pgTable, text, timestamp, uuid, integer, boolean, json, decimal, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'manager', 'customer']);
export const reservationStatusEnum = pgEnum('reservation_status', ['pending', 'confirmed', 'cancelled', 'completed', 'no_show']);
export const tableStatusEnum = pgEnum('table_status', ['available', 'occupied', 'maintenance', 'reserved']);
export const banquetEventTypeEnum = pgEnum('banquet_event_type', ['birthday', 'wedding', 'meeting', 'conference', 'corporate', 'private']);
export const contactStatusEnum = pgEnum('contact_status', ['new', 'in_progress', 'resolved', 'closed']);

// Users/Admins table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull().default('customer'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Tables table
export const tables = pgTable('tables', {
  id: uuid('id').primaryKey().defaultRandom(),
  number: integer('number').notNull().unique(),
  capacity: integer('capacity').notNull(),
  location: varchar('location', { length: 100 }),
  status: tableStatusEnum('status').notNull().default('available'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Banquet Bookings table
export const banquetBookings = pgTable('banquet_bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }).notNull(),
  eventType: banquetEventTypeEnum('event_type').notNull(),
  eventDate: timestamp('event_date').notNull(),
  startTime: varchar('start_time', { length: 10 }).notNull(), // HH:MM format
  endTime: varchar('end_time', { length: 10 }).notNull(), // HH:MM format
  numberOfGuests: integer('number_of_guests').notNull(),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  specialRequests: text('special_requests'),
  status: reservationStatusEnum('status').notNull().default('pending'),
  googleSheetsRowId: varchar('google_sheets_row_id', { length: 255 }), // For Google Sheets tracking
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Contact Messages table
export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  status: contactStatusEnum('status').notNull().default('new'),
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Reservations table
export const reservations = pgTable('reservations', {
  id: uuid('id').primaryKey().defaultRandom(),
  tableId: uuid('table_id').notNull().references(() => tables.id),
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 20 }),
  numberOfGuests: integer('number_of_guests').notNull(),
  reservationDate: timestamp('reservation_date').notNull(),
  reservationTime: varchar('reservation_time', { length: 10 }).notNull(), // HH:MM format
  duration: integer('duration').notNull().default(120), // minutes
  status: reservationStatusEnum('status').notNull().default('pending'),
  specialRequests: text('special_requests'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Google Sheets Integration table
export const googleSheetsIntegration = pgTable('google_sheets_integration', {
  id: uuid('id').primaryKey().defaultRandom(),
  sheetId: varchar('sheet_id', { length: 255 }).notNull(),
  sheetUrl: text('sheet_url').notNull(),
  credentials: json('credentials').notNull(), // Encrypted Google service account credentials
  isActive: boolean('is_active').notNull().default(true),
  lastSync: timestamp('last_sync'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Menu Items table (from your existing dishes data)
export const menuItems = pgTable('menu_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 255 }),
  category: varchar('category', { length: 50 }).notNull(), // appetizers, entrees, drinks, wines
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }),
  image: text('image'),
  mainImage: text('main_image'),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  chef: varchar('chef', { length: 255 }),
  chefTitle: varchar('chef_title', { length: 255 }),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  reservations: many(reservations),
  banquetBookings: many(banquetBookings),
  contactMessages: many(contactMessages),
}));

export const tablesRelations = relations(tables, ({ many }) => ({
  reservations: many(reservations),
}));

export const banquetBookingsRelations = relations(banquetBookings, ({ one }) => ({
  user: one(users, {
    fields: [banquetBookings.customerEmail],
    references: [users.email],
  }),
}));

export const contactMessagesRelations = relations(contactMessages, ({ one }) => ({
  user: one(users, {
    fields: [contactMessages.email],
    references: [users.email],
  }),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  table: one(tables, {
    fields: [reservations.tableId],
    references: [tables.id],
  }),
}));
