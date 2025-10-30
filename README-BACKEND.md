# Woodvale Restaurant Backend API

A comprehensive backend system for restaurant management with banquet booking, table reservations, and contact management using Supabase and Drizzle ORM.

## Features

- 🍽️ **Table Reservations**: Blinkit-style quick table booking with availability checking
- 🎉 **Banquet Bookings**: Event booking with Google Sheets integration
- 📞 **Contact Management**: Customer inquiry handling
- 👥 **Admin Panel**: Full CRUD operations for all data
- 📊 **Google Sheets Integration**: Automatic data sync for banquet events
- 🔐 **Authentication**: Supabase-based admin authentication

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth
- **Google Sheets**: Google APIs
- **Styling**: Tailwind CSS

## Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the environment template:

```bash
cp env.example .env.local
```

Update `.env.local` with your credentials:

```env
# Database (Supabase)
DATABASE_URL="postgresql://username:password@localhost:5432/woodvale_restaurant"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Google Sheets (Optional - for banquet bookings)
GOOGLE_SHEETS_CREDENTIALS="path-to-service-account-json"
GOOGLE_SHEETS_ID="your-google-sheet-id"

# Email (Optional - for notifications)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

### 3. Database Setup

Generate and run migrations:

```bash
# Generate Drizzle client
npx drizzle-kit generate

# Run migrations (if using local PostgreSQL)
npx drizzle-kit migrate

# Or push schema to Supabase
npx drizzle-kit push
```

### 4. Seed Database (Optional)

Create sample data:

```bash
# Create sample tables and admin user
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

## API Endpoints

### Table Reservations
- `GET /api/reservations` - List all reservations
- `POST /api/reservations` - Create reservation (auto-assign table)
- `GET /api/reservations/availability` - Check table availability
- `GET /api/reservations/[id]` - Get single reservation
- `PUT /api/reservations/[id]` - Update reservation
- `DELETE /api/reservations/[id]` - Delete reservation

### Banquet Bookings
- `GET /api/banquet` - List all banquet bookings
- `POST /api/banquet` - Create banquet booking
- `GET /api/banquet/[id]` - Get single booking
- `PUT /api/banquet/[id]` - Update booking
- `DELETE /api/banquet/[id]` - Delete booking

### Contact Messages
- `GET /api/contact` - List all contact messages
- `POST /api/contact` - Create contact message
- `GET /api/contact/[id]` - Get single message
- `PUT /api/contact/[id]` - Update message
- `DELETE /api/contact/[id]` - Delete message

## Admin Panel

Access the admin panel at `/admin` to:

- 📊 View dashboard with key metrics
- 🍽️ Manage table reservations
- 🎉 Manage banquet bookings
- 📞 Handle contact messages
- ✅ Update booking statuses
- 📝 Add admin notes

## Google Sheets Integration

For banquet bookings, you can integrate with Google Sheets:

1. Create a Google Service Account
2. Download the credentials JSON file
3. Create a Google Sheet with headers:
   - Timestamp, Name, Email, Phone, Event Type, Date, Start Time, End Time, Guests, Budget, Special Requests, Status
4. Update environment variables with your credentials

## Database Schema

### Core Tables
- **users**: Admin users with roles
- **tables**: Restaurant tables with capacity and location
- **reservations**: Table reservations
- **banquet_bookings**: Event bookings
- **contact_messages**: Customer inquiries
- **google_sheets_integration**: Google Sheets configuration

### Key Features

#### Table Reservation System (Blinkit-style)
- Quick availability checking
- Auto table assignment based on party size
- Time slot management
- Conflict detection

#### Banquet Booking System
- Event type categorization
- Google Sheets integration
- Budget tracking
- Special requests handling

#### Contact Management
- Message categorization
- Status tracking
- Admin response system

## Development

### Database Management
```bash
# View database schema
npx drizzle-kit studio

# Generate new migration
npx drizzle-kit generate

# Push schema changes
npx drizzle-kit push
```

### Building for Production
```bash
npm run build
npm start
```

## Frontend Integration

The existing frontend forms can be updated to use these APIs:

### Banquet Form (`/banquet`)
```typescript
const submitBanquetBooking = async (data) => {
  const response = await fetch('/api/banquet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
```

### Table Reservation (`/reserve`)
```typescript
const checkAvailability = async (date, time, guests) => {
  const response = await fetch(`/api/reservations/availability?date=${date}&time=${time}&guests=${guests}`);
  return response.json();
};
```

### Contact Form
```typescript
const submitContactMessage = async (data) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Supabase PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `GOOGLE_SHEETS_CREDENTIALS` | Google service account JSON path | No |
| `GOOGLE_SHEETS_ID` | Google Sheet ID for banquet data | No |
| `SMTP_HOST` | Email SMTP host | No |
| `SMTP_USER` | Email username | No |
| `SMTP_PASS` | Email password | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
