#!/bin/bash

echo "🚀 Setting up Woodvale Restaurant Backend for Production..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp env.example .env.local
    echo "⚠️  Please update .env.local with your production credentials before continuing"
    echo "   Required: DATABASE_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   Optional: GOOGLE_SHEETS_CREDENTIALS, GOOGLE_SHEETS_ID, SMTP settings"
    read -p "Press Enter when you've updated .env.local..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Drizzle client
echo "🔧 Generating Drizzle client..."
npx drizzle-kit generate

# Push schema to database
echo "🗄️  Pushing database schema..."
npx drizzle-kit push

# Create seed data
echo "🌱 Creating seed data..."
npm run seed

echo ""
echo "🎉 Production setup complete!"
echo ""
echo "📊 Admin Panel: http://localhost:3000/admin"
echo "   Default Admin: admin@woodvale.com / admin123"
echo ""
echo "🚀 Start production server: npm run build && npm start"
echo "📚 View database: npx drizzle-kit studio"
echo ""
echo "✅ Your restaurant backend is ready for production!"
