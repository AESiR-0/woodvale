import { NextRequest, NextResponse } from 'next/server';
import { db, banquetBookings } from '@/lib/db';
import { createBanquetBookingSchema, paginationSchema, dateRangeSchema } from '@/lib/validations/schemas';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { withManagerAuth } from '@/lib/auth/middleware';

// GET /api/banquet - Get all banquet bookings with pagination and filtering
export const GET = withManagerAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const { page, limit } = paginationSchema.parse({
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
    });
    const { startDate, endDate } = dateRangeSchema.parse({
      startDate: searchParams.get('startDate') || undefined,
      endDate: searchParams.get('endDate') || undefined,
    });

    const status = searchParams.get('status');
    const eventType = searchParams.get('eventType');

    // Build where conditions
    const whereConditions = [];
    if (startDate) whereConditions.push(gte(banquetBookings.eventDate, new Date(startDate)));
    if (endDate) whereConditions.push(lte(banquetBookings.eventDate, new Date(endDate)));
    if (status) whereConditions.push(eq(banquetBookings.status, status as any));
    if (eventType) whereConditions.push(eq(banquetBookings.eventType, eventType as any));

    const where = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Get banquet bookings with pagination
    const [bookings, totalCount] = await Promise.all([
      db
        .select()
        .from(banquetBookings)
        .where(where)
        .orderBy(desc(banquetBookings.eventDate))
        .limit(limit)
        .offset((page - 1) * limit),
      db
        .select({ count: banquetBookings.id })
        .from(banquetBookings)
        .where(where)
        .then(rows => rows.length),
    ]);

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching banquet bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banquet bookings' },
      { status: 500 }
    );
  }
});

// POST /api/banquet - Create new banquet booking
export const POST = withManagerAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const validatedData = createBanquetBookingSchema.parse(body);

    // Create banquet booking
    const [newBooking] = await db
      .insert(banquetBookings)
      .values({
        ...validatedData,
        eventDate: new Date(validatedData.eventDate),
      })
      .returning();

    // TODO: Integrate with Google Sheets if configured
    // await syncToGoogleSheets(newBooking);

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    console.error('Error creating banquet booking:', error);
    return NextResponse.json(
      { error: 'Failed to create banquet booking' },
      { status: 500 }
    );
  }
});
