# 🚀 Production Deployment Guide

This guide will help you deploy the Woodvale Restaurant backend to production with minimal setup.

## 📋 Prerequisites

- Node.js 18+ installed
- Database (Supabase or PostgreSQL)
- Google Sheets credentials (optional)
- Email SMTP settings (optional)

## 🚀 Quick Production Setup

### Option 1: One-Command Setup (Recommended)

```bash
# Clone and setup
git clone <your-repo>
cd woodvale
npm run setup
```

This will:
- Install dependencies
- Generate database schema
- Create admin users
- Set up sample data

### Option 2: Manual Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp env.example .env.local
# Edit .env.local with your credentials

# 3. Setup database
npm run db:push

# 4. Seed database
npm run seed

# 5. Start production server
npm run build
npm start
```

## 🔧 Environment Configuration

### Required Variables

```env
# Database (Supabase)
DATABASE_URL="postgresql://username:password@host:port/database"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### Optional Variables

```env
# Google Sheets Integration
GOOGLE_SHEETS_CREDENTIALS="path/to/service-account.json"
GOOGLE_SHEETS_ID="your-google-sheet-id"

# Email Notifications
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## 🗄️ Database Setup

### Using Supabase (Recommended)

1. Create a new Supabase project
2. Get your database URL and anon key
3. Add them to `.env.local`
4. Run `npm run db:push`

### Using Local PostgreSQL

1. Install PostgreSQL
2. Create database: `createdb woodvale_restaurant`
3. Update `DATABASE_URL` in `.env.local`
4. Run `npm run db:push`

## 📊 Google Sheets Setup (Optional)

1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account
4. Download credentials JSON
5. Create a Google Sheet with headers:
   - Timestamp, Name, Email, Phone, Event Type, Date, Start Time, End Time, Guests, Budget, Special Requests, Status
6. Share the sheet with your service account email
7. Set `GOOGLE_SHEETS_CREDENTIALS` and `GOOGLE_SHEETS_ID`

## 📧 Email Setup (Optional)

1. Create a Gmail app password
2. Set SMTP variables in `.env.local`
3. Email notifications will be sent for new bookings

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# 1. Copy environment file
cp env.example .env

# 2. Update .env with your credentials
# 3. Start services
docker-compose up -d

# 4. Run database migrations
docker-compose exec app npm run db:push

# 5. Seed database
docker-compose exec app npm run seed
```

### Using Docker

```bash
# Build image
docker build -t woodvale-restaurant .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXT_PUBLIC_SUPABASE_URL="your-supabase-url" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key" \
  woodvale-restaurant
```

## 🌐 Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

### Environment Variables for Vercel:
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}
GOOGLE_SHEETS_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

## 🔍 Health Checks

- **API Health**: `GET /api/health`
- **Admin Panel**: `/admin`
- **Database Studio**: `npm run db:studio`

## 👥 Default Users

After seeding, you'll have:

- **Admin**: `admin@woodvale.com` / `admin123`
- **Manager**: `manager@woodvale.com` / `manager123`

**⚠️ Change these passwords in production!**

## 📊 Admin Panel Access

1. Go to `/admin`
2. Login with admin credentials
3. Manage all bookings, reservations, and contacts

## 🔧 Production Checklist

- [ ] Database configured and connected
- [ ] Environment variables set
- [ ] Database schema pushed (`npm run db:push`)
- [ ] Database seeded (`npm run seed`)
- [ ] Admin passwords changed
- [ ] Google Sheets configured (optional)
- [ ] Email notifications configured (optional)
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Health checks passing

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npm run db:studio
```

### Build Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Permission Issues
```bash
# Fix script permissions
chmod +x scripts/setup.sh
```

## 📞 Support

If you encounter issues:

1. Check the health endpoint: `/api/health`
2. Verify environment variables
3. Check database connection
4. Review logs for errors

## 🎉 You're Ready!

Once deployed, your restaurant backend will have:

- ✅ Table reservation system (Blinkit-style)
- ✅ Banquet booking system
- ✅ Contact form handling
- ✅ Admin panel for management
- ✅ Google Sheets integration
- ✅ Email notifications
- ✅ Production-ready setup

**Admin Panel**: `https://your-domain.com/admin`
**API Health**: `https://your-domain.com/api/health`
