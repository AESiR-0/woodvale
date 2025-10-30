import { NextRequest, NextResponse } from 'next/server';
import { db, reservations, tables } from '@/lib/db';
import { eq, and, gte, lte, sql } from 'drizzle-orm';

// GET /api/reservations/availability - Check table availability for specific date/time
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const numberOfGuests = searchParams.get('guests');

    if (!date || !time || !numberOfGuests) {
      return NextResponse.json(
        { error: 'Date, time, and number of guests are required' },
        { status: 400 }
      );
    }

    const targetDate = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    targetDate.setHours(hours, minutes, 0, 0);

    // Get all available tables for the party size
    const availableTables = await db
      .select({
        id: tables.id,
        number: tables.number,
        capacity: tables.capacity,
        location: tables.location,
      })
      .from(tables)
      .where(
        and(
          eq(tables.status, 'available'),
          eq(tables.isActive, true),
          gte(tables.capacity, parseInt(numberOfGuests))
        )
      )
      .orderBy(tables.capacity);

    if (availableTables.length === 0) {
      return NextResponse.json({
        available: false,
        message: 'No tables available for the requested party size',
        alternatives: []
      });
    }

    // Check for time conflicts on each table
    const availableSlots = [];
    for (const table of availableTables) {
      const conflictingReservations = await db
        .select({ id: reservations.id })
        .from(reservations)
        .where(
          and(
            eq(reservations.tableId, table.id),
            eq(reservations.status, 'confirmed'),
            gte(reservations.reservationDate, new Date(targetDate.getTime() - 120 * 60000)), // 2 hours before
            lte(reservations.reservationDate, new Date(targetDate.getTime() + 120 * 60000))  // 2 hours after
          )
        );

      if (conflictingReservations.length === 0) {
        availableSlots.push({
          tableId: table.id,
          tableNumber: table.number,
          capacity: table.capacity,
          location: table.location,
          available: true
        });
      }
    }

    return NextResponse.json({
      available: availableSlots.length > 0,
      date,
      time,
      numberOfGuests: parseInt(numberOfGuests),
      availableTables: availableSlots,
      message: availableSlots.length > 0 
        ? `Found ${availableSlots.length} available table(s)` 
        : 'No tables available at the requested time'
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}
