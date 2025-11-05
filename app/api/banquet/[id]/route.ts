import { NextRequest, NextResponse } from 'next/server';
import { db, banquetBookings } from '@/lib/db';
import { updateBanquetBookingSchema } from '@/lib/validations/schemas';
import { eq } from 'drizzle-orm';

// GET /api/banquet/[id] - Get single banquet booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [booking] = await db
      .select()
      .from(banquetBookings)
      .where(eq(banquetBookings.id, id));

    if (!booking) {
      return NextResponse.json(
        { error: 'Banquet booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching banquet booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banquet booking' },
      { status: 500 }
    );
  }
}

// PUT /api/banquet/[id] - Update banquet booking
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateBanquetBookingSchema.parse(body);

    const [updatedBooking] = await db
      .update(banquetBookings)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(banquetBookings.id, id))
      .returning();

    if (!updatedBooking) {
      return NextResponse.json(
        { error: 'Banquet booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBooking);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    console.error('Error updating banquet booking:', error);
    return NextResponse.json(
      { error: 'Failed to update banquet booking' },
      { status: 500 }
    );
  }
}

// DELETE /api/banquet/[id] - Delete banquet booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [deletedBooking] = await db
      .delete(banquetBookings)
      .where(eq(banquetBookings.id, id))
      .returning();

    if (!deletedBooking) {
      return NextResponse.json(
        { error: 'Banquet booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Banquet booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting banquet booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete banquet booking' },
      { status: 500 }
    );
  }
}
