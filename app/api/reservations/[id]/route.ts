import { NextRequest, NextResponse } from 'next/server';
import { db, reservations, tables } from '@/lib/db';
import { updateReservationSchema } from '@/lib/validations/schemas';
import { eq } from 'drizzle-orm';
import { openTableService } from '@/lib/opentable';

// GET /api/reservations/[id] - Get single reservation
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      .where(eq(reservations.id, id));

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateReservationSchema.parse(body);

    // Get existing reservation to check OpenTable sync status
    const [existingReservation] = await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, id));

    if (!existingReservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    const [updatedReservation] = await db
      .update(reservations)
      .set({
        ...validatedData,
        reservationDate: validatedData.reservationDate ? new Date(validatedData.reservationDate) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(reservations.id, id))
      .returning();

    // Sync update to OpenTable if it was previously synced
    if (existingReservation.openTableSynced && existingReservation.openTableReservationId) {
      try {
        const updateData: any = {
          numberOfGuests: existingReservation.numberOfGuests,
        };
        if (validatedData.reservationDate) {
          updateData.reservationDate = new Date(validatedData.reservationDate);
        }
        if (validatedData.reservationTime) {
          updateData.reservationTime = validatedData.reservationTime;
        }
        if (validatedData.specialRequests !== undefined) {
          updateData.specialRequests = validatedData.specialRequests;
        }
        
        await openTableService.updateReservation(
          existingReservation.openTableReservationId,
          updateData
        );
      } catch (openTableError) {
        console.error('Failed to update reservation in OpenTable:', openTableError);
      }
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Get reservation before deleting to check OpenTable sync
    const [reservationToDelete] = await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, id));

    if (!reservationToDelete) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    // Cancel in OpenTable if synced
    if (reservationToDelete.openTableSynced && reservationToDelete.openTableReservationId) {
      try {
        await openTableService.cancelReservation(reservationToDelete.openTableReservationId);
      } catch (openTableError) {
        console.error('Failed to cancel reservation in OpenTable:', openTableError);
      }
    }

    const [deletedReservation] = await db
      .delete(reservations)
      .where(eq(reservations.id, id))
      .returning();

    return NextResponse.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return NextResponse.json(
      { error: 'Failed to delete reservation' },
      { status: 500 }
    );
  }
}
