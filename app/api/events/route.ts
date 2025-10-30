import { NextRequest, NextResponse } from 'next/server';
import { db, events, eventBookings } from '@/lib/db';
import { createEventSchema, paginationSchema, dateRangeSchema } from '@/lib/validations/schemas';
import { eq, and, gte, lte, desc } from 'drizzle-orm';

// GET /api/events - Get all events with pagination and filtering
export async function GET(request: NextRequest) {
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
    const isActive = searchParams.get('isActive');

    // Build where conditions
    const whereConditions = [];
    if (startDate) whereConditions.push(gte(events.eventDate, new Date(startDate)));
    if (endDate) whereConditions.push(lte(events.eventDate, new Date(endDate)));
    if (status) whereConditions.push(eq(events.status, status as any));
    if (isActive !== null) whereConditions.push(eq(events.isActive, isActive === 'true'));

    const where = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Get events with booking counts
    const eventsData = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
        eventDate: events.eventDate,
        startTime: events.startTime,
        endTime: events.endTime,
        maxGuests: events.maxGuests,
        price: events.price,
        status: events.status,
        isActive: events.isActive,
        googleSheetsId: events.googleSheetsId,
        googleSheetsUrl: events.googleSheetsUrl,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
      })
      .from(events)
      .where(where)
      .orderBy(desc(events.eventDate))
      .limit(limit)
      .offset((page - 1) * limit);

    // Get booking counts for each event
    const eventsWithBookings = await Promise.all(
      eventsData.map(async (event) => {
        const [bookings] = await db
          .select({ count: eventBookings.id })
          .from(eventBookings)
          .where(
            and(
              eq(eventBookings.eventId, event.id),
              eq(eventBookings.status, 'confirmed')
            )
          );

        const totalGuests = await db
          .select({ total: eventBookings.numberOfGuests })
          .from(eventBookings)
          .where(
            and(
              eq(eventBookings.eventId, event.id),
              eq(eventBookings.status, 'confirmed')
            )
          );

        return {
          ...event,
          bookingCount: bookings?.count || 0,
          totalGuests: totalGuests.reduce((sum, booking) => sum + booking.total, 0),
        };
      })
    );

    const totalCount = await db
      .select({ count: events.id })
      .from(events)
      .where(where)
      .then(rows => rows.length);

    return NextResponse.json({
      events: eventsWithBookings,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createEventSchema.parse(body);

    const [newEvent] = await db
      .insert(events)
      .values({
        ...validatedData,
        eventDate: new Date(validatedData.eventDate),
      })
      .returning();

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
