import { NextRequest, NextResponse } from 'next/server';
import { db, contactMessages } from '@/lib/db';
import { createContactMessageSchema, paginationSchema, dateRangeSchema } from '@/lib/validations/schemas';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { sendEmailNotification } from '@/lib/email/setup';
import { ZodError } from 'zod';

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

    // Format email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5f41;">New Contact Form Submission</h2>
        <p>A new message has been submitted through the contact form.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c5f41;">Message Details</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ''}
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${validatedData.message}</p>
        </div>
        
        <p style="color: #666; font-size: 12px;">This is an automated notification from the Woodvale Restaurant website.</p>
      </div>
    `;

    // Send email notification (don't fail if email fails)
    try {
      await sendEmailNotification(
        ['padon@woodvalefacility.ca', 'info@thewoodvaleroom.com'],
        `Contact Form: ${validatedData.subject}`,
        emailHtml
      );
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Failed to send email notification (contact form still saved):', emailError);
    }

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error', 
          issues: error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      );
    }
    console.error('Error creating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to create contact message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
