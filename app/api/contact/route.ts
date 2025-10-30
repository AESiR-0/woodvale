import { NextRequest, NextResponse } from 'next/server';
import { db, contactMessages } from '@/lib/db';
import { createContactMessageSchema, paginationSchema, dateRangeSchema } from '@/lib/validations/schemas';
import { eq, and, gte, lte, desc } from 'drizzle-orm';

// GET /api/contact - Get all contact messages with pagination and filtering
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
    const subject = searchParams.get('subject');

    // Build where conditions
    const whereConditions = [];
    if (startDate) whereConditions.push(gte(contactMessages.createdAt, new Date(startDate)));
    if (endDate) whereConditions.push(lte(contactMessages.createdAt, new Date(endDate)));
    if (status) whereConditions.push(eq(contactMessages.status, status as any));
    if (subject) whereConditions.push(eq(contactMessages.subject, subject));

    const where = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    // Get contact messages with pagination
    const [messages, totalCount] = await Promise.all([
      db
        .select()
        .from(contactMessages)
        .where(where)
        .orderBy(desc(contactMessages.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
      db
        .select({ count: contactMessages.id })
        .from(contactMessages)
        .where(where)
        .then(rows => rows.length),
    ]);

    return NextResponse.json({
      messages,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    );
  }
}

// POST /api/contact - Create new contact message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createContactMessageSchema.parse(body);

    // Create contact message
    const [newMessage] = await db
      .insert(contactMessages)
      .values(validatedData)
      .returning();

    // TODO: Send email notification to admin
    // await sendEmailNotification(newMessage);

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to create contact message' },
      { status: 500 }
    );
  }
}
