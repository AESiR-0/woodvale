import { z } from 'zod';

// User schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['admin', 'manager', 'customer']).default('customer'),
});

export const updateUserSchema = createUserSchema.partial().omit({ password: true });

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Table schemas
export const createTableSchema = z.object({
  number: z.number().int().positive('Table number must be positive'),
  capacity: z.number().int().positive('Capacity must be positive'),
  location: z.string().optional(),
  status: z.enum(['available', 'occupied', 'maintenance', 'reserved']).default('available'),
});

export const updateTableSchema = createTableSchema.partial();

// Banquet Booking schemas
export const createBanquetBookingSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required').max(255),
  customerEmail: z.string().email('Invalid email format'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  eventType: z.enum(['birthday', 'wedding', 'meeting', 'conference', 'corporate', 'private']),
  eventDate: z.string().datetime(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  numberOfGuests: z.number().int().positive('Number of guests must be positive'),
  budget: z.number().positive().optional(),
  specialRequests: z.string().optional(),
});

export const updateBanquetBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'no_show']).optional(),
  specialRequests: z.string().optional(),
  adminNotes: z.string().optional(),
});

// Contact Message schemas
export const createContactMessageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email format'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const updateContactMessageSchema = z.object({
  status: z.enum(['new', 'in_progress', 'resolved', 'closed']).optional(),
  adminNotes: z.string().optional(),
});

// Reservation schemas
export const createReservationSchema = z.object({
  tableId: z.string().uuid('Invalid table ID').optional(),
  customerName: z.string().min(1, 'Customer name is required').max(255),
  customerEmail: z.string().email('Invalid email format'),
  customerPhone: z.string().optional(),
  numberOfGuests: z.number().int().positive('Number of guests must be positive'),
  reservationDate: z.string().datetime(),
  reservationTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  duration: z.number().int().positive().default(120),
  specialRequests: z.string().optional(),
});

export const updateReservationSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'no_show']).optional(),
  specialRequests: z.string().optional(),
  reservationDate: z.string().datetime().optional(),
  reservationTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format').optional(),
});

// Menu Item schemas
export const createMenuItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  subtitle: z.string().max(255).optional(),
  category: z.enum(['appetizers', 'entrees', 'drinks', 'wines']),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  image: z.string().url().optional(),
  mainImage: z.string().url().optional(),
  rating: z.number().min(0).max(5).optional(),
  chef: z.string().max(255).optional(),
  chefTitle: z.string().max(255).optional(),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();

// Google Sheets Integration schemas
export const createGoogleSheetsIntegrationSchema = z.object({
  eventId: z.string().uuid('Invalid event ID'),
  sheetId: z.string().min(1, 'Sheet ID is required'),
  sheetUrl: z.string().url('Invalid sheet URL'),
  credentials: z.object({
    type: z.string(),
    project_id: z.string(),
    private_key_id: z.string(),
    private_key: z.string(),
    client_email: z.string(),
    client_id: z.string(),
    auth_uri: z.string(),
    token_uri: z.string(),
    auth_provider_x509_cert_url: z.string(),
    client_x509_cert_url: z.string(),
  }),
});

// Query schemas
export const paginationSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().int().positive()).default('1'),
  limit: z.string().transform(Number).pipe(z.number().int().positive().max(100)).default('10'),
});

export const dateRangeSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  status: z.string().optional(),
});
