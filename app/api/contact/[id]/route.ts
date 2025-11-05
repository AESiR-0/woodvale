import { NextRequest, NextResponse } from 'next/server';
import { db, contactMessages } from '@/lib/db';
import { updateContactMessageSchema } from '@/lib/validations/schemas';
import { eq } from 'drizzle-orm';

// GET /api/contact/[id] - Get single contact message
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [message] = await db
      .select()
      .from(contactMessages)
      .where(eq(contactMessages.id, id));

    if (!message) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact message' },
      { status: 500 }
    );
  }
}

// PUT /api/contact/[id] - Update contact message
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateContactMessageSchema.parse(body);

    const [updatedMessage] = await db
      .update(contactMessages)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(contactMessages.id, id))
      .returning();

    if (!updatedMessage) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMessage);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    console.error('Error updating contact message:', error);
    return NextResponse.json(
      { error: 'Failed to update contact message' },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/[id] - Delete contact message
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [deletedMessage] = await db
      .delete(contactMessages)
      .where(eq(contactMessages.id, id))
      .returning();

    if (!deletedMessage) {
      return NextResponse.json(
        { error: 'Contact message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json(
      { error: 'Failed to delete contact message' },
      { status: 500 }
    );
  }
}
