import { NextRequest, NextResponse } from 'next/server';
import { db, reservations, tables } from '@/lib/db';
import { updateReservationSchema } from '@/lib/validations/schemas';
import { eq } from 'drizzle-orm';

// GET /api/reservations/[id] - Get single reservation
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [reservation] = await db
      .select({
        id: reservations.id,
        customerName: reservations.customerName,
        customerEmail: reservations.customerEmail,
        customerPhone: reservations.customerPhone,
        numberOfGuests: reservations.numberOfGuests,
        reservationDate: reservations.reservationDate,
        reservationTime: reservations.reservationTime,
        duration: reservations.duration,
        status: reservations.status,
        specialRequests: reservations.specialRequests,
        createdAt: reservations.createdAt,
        updatedAt: reservations.updatedAt,
        table: {
          id: tables.id,
          number: tables.number,
          capacity: tables.capacity,
          location: tables.location,
          status: tables.status,
        },
      })
      .from(reservations)
      .leftJoin(tables, eq(reservations.tableId, tables.id))
      .where(eq(reservations.id, params.id));

    if (!reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Error fetching reservation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservation' },
      { status: 500 }
    );
  }
}

// PUT /api/reservations/[id] - Update reservation
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateReservationSchema.parse(body);

    const [updatedReservation] = await db
      .update(reservations)
      .set({
        ...validatedData,
        reservationDate: validatedData.reservationDate ? new Date(validatedData.reservationDate) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(reservations.id, params.id))
      .returning();

    if (!updatedReservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedReservation);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    console.error('Error updating reservation:', error);
    return NextResponse.json(
      { error: 'Failed to update reservation' },
      { status: 500 }
    );
  }
}

// DELETE /api/reservations/[id] - Delete reservation
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const [deletedReservation] = await db
      .delete(reservations)
      .where(eq(reservations.id, params.id))
      .returning();

    if (!deletedReservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return NextResponse.json(
      { error: 'Failed to delete reservation' },
      { status: 500 }
    );
  }
}
