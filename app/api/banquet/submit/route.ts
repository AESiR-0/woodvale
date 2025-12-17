import { NextRequest, NextResponse } from 'next/server';
import { db, banquetBookings } from '@/lib/db';
import { sendEmailNotification } from '@/lib/email/setup';
import { z } from 'zod';

// Public schema for banquet booking submission (matches form fields)
const submitBanquetBookingSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required').max(255),
  customerEmail: z.string().email('Invalid email format'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  eventType: z.string().min(1, 'Event type is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  numberOfGuests: z.number().int().positive('Number of guests must be positive'),
  specialRequests: z.string().optional(),
});

// Map event type to enum value or use "private" as default
function mapEventType(eventType: string): 'birthday' | 'wedding' | 'meeting' | 'conference' | 'corporate' | 'private' {
  const lower = eventType.toLowerCase();
  if (['birthday', 'wedding', 'meeting', 'conference', 'corporate', 'private'].includes(lower)) {
    return lower as any;
  }
  return 'private'; // Default for "other" or unknown types
}

// POST /api/banquet/submit - Public endpoint for banquet booking submissions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = submitBanquetBookingSchema.parse(body);

    // Convert dates and set default times
    const startDate = new Date(validatedData.startDate);
    const endDate = new Date(validatedData.endDate);
    
    // Use start date as event date, default times to 4:00 PM - 10:00 PM
    const mappedEventType = mapEventType(validatedData.eventType);

    // Create banquet booking
    const [newBooking] = await db
      .insert(banquetBookings)
      .values({
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
        eventType: mappedEventType,
        eventDate: startDate,
        startTime: '16:00', // 4:00 PM default
        endTime: '22:00', // 10:00 PM default
        numberOfGuests: validatedData.numberOfGuests,
        specialRequests: validatedData.specialRequests || null,
        status: 'pending',
      })
      .returning();

    // Format email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c5f41;">New Event Booking Request</h2>
        <p>A new event booking has been submitted through the website.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c5f41;">Booking Details</h3>
          <p><strong>Name:</strong> ${validatedData.customerName}</p>
          <p><strong>Email:</strong> ${validatedData.customerEmail}</p>
          <p><strong>Phone:</strong> ${validatedData.customerPhone}</p>
          <p><strong>Event Type:</strong> ${validatedData.eventType}</p>
          <p><strong>Start Date:</strong> ${startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>End Date:</strong> ${endDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p><strong>Number of Guests:</strong> ${validatedData.numberOfGuests}</p>
          ${validatedData.specialRequests ? `<p><strong>Special Requests:</strong> ${validatedData.specialRequests}</p>` : ''}
        </div>
        
        <p style="color: #666; font-size: 12px;">This is an automated notification from the Woodvale Restaurant website.</p>
      </div>
    `;

    // Send emails to all recipients (including test email) - don't fail if email fails
    try {
      const recipients = ['padon@woodvalefacility.ca', 'bobbi-jo@woodvalefacility.ca', 'info@thewoodvaleroom.com'];
      await sendEmailNotification(
        recipients,
        `New Event Booking Request - ${validatedData.customerName}`,
        emailHtml
      );
    } catch (emailError) {
      // Log email error but don't fail the request
      console.error('Failed to send email notification (booking still saved):', emailError);
    }

    return NextResponse.json({ 
      success: true,
      booking: newBooking,
      message: 'Booking submitted successfully'
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating banquet booking:', error);
    return NextResponse.json(
      { error: 'Failed to create banquet booking' },
      { status: 500 }
    );
  }
}

