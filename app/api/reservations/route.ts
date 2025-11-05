import { NextRequest, NextResponse } from 'next/server';
import { db, reservations, tables } from '@/lib/db';
import { createReservationSchema, paginationSchema, dateRangeSchema } from '@/lib/validations/schemas';
import { eq, and, gte, lte, desc, sql } from 'drizzle-orm';
import { openTableService } from '@/lib/opentable';

// GET /api/reservations - Get all reservations with pagination and filtering
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
    const tableId = searchParams.get('tableId');

    // Build where conditions
    const whereConditions = [];
    if (startDate) whereConditions.push(gte(reservations.reservationDate, new Date(startDate)));
    if (endDate) whereConditions.push(lte(reservations.reservationDate, new Date(endDate)));
    if (status) whereConditions.push(eq(reservations.status, status as any));
    if (tableId) whereConditions.push(eq(reservations.tableId, tableId));

    const where = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Get reservations with pagination
    const [reservationsData, totalCount] = await Promise.all([
      db
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
        .where(where)
        .orderBy(desc(reservations.reservationDate))
        .limit(limit)
        .offset((page - 1) * limit),
      db
        .select({ count: reservations.id })
        .from(reservations)
        .where(where)
        .then(rows => rows.length),
    ]);

    return NextResponse.json({
      reservations: reservationsData,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}

// POST /api/reservations - Create new reservation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createReservationSchema.parse(body);

    // Auto-assign table if not provided
    let tableId = validatedData.tableId;
    if (!tableId) {
      const availableTable = await db
        .select({ id: tables.id })
        .from(tables)
        .where(
          and(
            eq(tables.status, 'available'),
            eq(tables.isActive, true),
            gte(tables.capacity, validatedData.numberOfGuests)
          )
        )
        .orderBy(tables.capacity)
        .limit(1);

      if (availableTable.length === 0) {
        return NextResponse.json(
          { error: 'No available tables for the requested party size' },
          { status: 400 }
        );
      }
      tableId = availableTable[0].id;
    }

    // Check for time conflicts
    const reservationDateTime = new Date(validatedData.reservationDate);
    const [hours, minutes] = validatedData.reservationTime.split(':').map(Number);
    reservationDateTime.setHours(hours, minutes, 0, 0);
    
    const endDateTime = new Date(reservationDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + validatedData.duration);

    const conflictingReservations = await db
      .select({ id: reservations.id })
      .from(reservations)
      .where(
        and(
          eq(reservations.tableId, tableId),
          eq(reservations.status, 'confirmed'),
          gte(reservations.reservationDate, new Date(reservationDateTime.getTime() - validatedData.duration * 60000)),
          lte(reservations.reservationDate, endDateTime)
        )
      );

    if (conflictingReservations.length > 0) {
      return NextResponse.json(
        { error: 'Table is not available at the requested time' },
        { status: 400 }
      );
    }

    // Create reservation
    // Combine firstName and lastName for customerName if not provided
    const customerName = validatedData.customerName || `${validatedData.firstName} ${validatedData.lastName}`;
    
    const [newReservation] = await db
      .insert(reservations)
      .values({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
        phoneCountryCode: validatedData.phoneCountryCode || '+1',
        numberOfGuests: validatedData.numberOfGuests,
        reservationDate: new Date(validatedData.reservationDate),
        reservationTime: validatedData.reservationTime,
        duration: validatedData.duration,
        occasion: validatedData.occasion,
        specialRequests: validatedData.specialRequests,
        restaurantMarketingConsent: validatedData.restaurantMarketingConsent || false,
        openTableMarketingConsent: validatedData.openTableMarketingConsent || false,
        textUpdatesConsent: validatedData.textUpdatesConsent || false,
        tableId,
        openTableSynced: false,
      })
      .returning();

    // Sync to OpenTable (don't fail if OpenTable sync fails)
    if (openTableService.isConfigured()) {
      try {
        const openTableReservationId = await openTableService.createReservation({
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          customerName,
          customerEmail: validatedData.customerEmail,
          customerPhone: validatedData.customerPhone,
          phoneCountryCode: validatedData.phoneCountryCode,
          numberOfGuests: validatedData.numberOfGuests,
          reservationDate: new Date(validatedData.reservationDate),
          reservationTime: validatedData.reservationTime,
          occasion: validatedData.occasion,
          specialRequests: validatedData.specialRequests,
        });

        if (openTableReservationId) {
          // Update reservation with OpenTable ID
          await db
            .update(reservations)
            .set({
              openTableReservationId,
              openTableSynced: true,
            })
            .where(eq(reservations.id, newReservation.id));
          
          newReservation.openTableReservationId = openTableReservationId;
          newReservation.openTableSynced = true;
        }
      } catch (openTableError) {
        // Log error but don't fail the reservation
        console.error('Failed to sync reservation to OpenTable (reservation still saved):', openTableError);
      }
    }

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    console.error('Error creating reservation:', error);
    return NextResponse.json(
      { error: 'Failed to create reservation' },
      { status: 500 }
    );
  }
}
