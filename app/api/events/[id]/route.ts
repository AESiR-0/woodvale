import { NextRequest, NextResponse } from 'next/server';
import { db, events, eventBookings } from '@/lib/db';
import { updateEventSchema } from '@/lib/validations/schemas';
import { eq } from 'drizzle-orm';

// GET /api/events/[id] - Get single event with bookings
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, params.id));

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Get bookings for this event
    const bookings = await db
      .select()
      .from(eventBookings)
      .where(eq(eventBookings.eventId, params.id))
      .orderBy(eventBookings.createdAt);

    return NextResponse.json({
      ...event,
      bookings,
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

// PUT /api/events/[id] - Update event
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateEventSchema.parse(body);

    const [updatedEvent] = await db
      .update(events)
      .set({
        ...validatedData,
        eventDate: validatedData.eventDate ? new Date(validatedData.eventDate) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(events.id, params.id))
      .returning();

    if (!updatedEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEvent);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if event has confirmed bookings
    const [confirmedBookings] = await db
      .select({ count: eventBookings.id })
      .from(eventBookings)
      .where(
        and(
          eq(eventBookings.eventId, params.id),
          eq(eventBookings.status, 'confirmed')
        )
      );

    if (confirmedBookings?.count > 0) {
      return NextResponse.json(
        { error: 'Cannot delete event with confirmed bookings' },
        { status: 400 }
      );
    }

    const [deletedEvent] = await db
      .delete(events)
      .where(eq(events.id, params.id))
      .returning();

    if (!deletedEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
