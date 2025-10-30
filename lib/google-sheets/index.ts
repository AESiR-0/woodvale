import { google } from 'googleapis';
import { db, googleSheetsIntegration, banquetBookings } from '@/lib/db';
import { eq } from 'drizzle-orm';

interface GoogleSheetsConfig {
  sheetId: string;
  credentials: any;
}

export class GoogleSheetsService {
  private auth: any;
  private sheets: any;

  constructor() {
    this.auth = null;
    this.sheets = null;
  }

  private async initializeAuth() {
    if (this.auth) return;

    try {
      // Get credentials from database
      const [config] = await db
        .select()
        .from(googleSheetsIntegration)
        .where(eq(googleSheetsIntegration.isActive, true))
        .limit(1);

      if (!config) {
        throw new Error('No active Google Sheets configuration found');
      }

      this.auth = new google.auth.GoogleAuth({
        credentials: config.credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    } catch (error) {
      console.error('Error initializing Google Sheets auth:', error);
      throw error;
    }
  }

  async addBanquetBooking(booking: any) {
    try {
      await this.initializeAuth();

      const [config] = await db
        .select()
        .from(googleSheetsIntegration)
        .where(eq(googleSheetsIntegration.isActive, true))
        .limit(1);

      if (!config) {
        throw new Error('No active Google Sheets configuration found');
      }

      const values = [
        [
          new Date().toISOString(),
          booking.customerName,
          booking.customerEmail,
          booking.customerPhone,
          booking.eventType,
          booking.eventDate,
          booking.startTime,
          booking.endTime,
          booking.numberOfGuests,
          booking.budget || '',
          booking.specialRequests || '',
          booking.status,
        ],
      ];

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: config.sheetId,
        range: 'Banquet Bookings!A:L', // Adjust range as needed
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values,
        },
      });

      // Update booking with Google Sheets row ID
      const rowId = response.data.updates?.updatedRange?.split('!')[1]?.split(':')[0];
      if (rowId) {
        await db
          .update(banquetBookings)
          .set({ googleSheetsRowId: rowId })
          .where(eq(banquetBookings.id, booking.id));
      }

      return response.data;
    } catch (error) {
      console.error('Error adding banquet booking to Google Sheets:', error);
      throw error;
    }
  }

  async updateBanquetBooking(booking: any) {
    try {
      await this.initializeAuth();

      const [config] = await db
        .select()
        .from(googleSheetsIntegration)
        .where(eq(googleSheetsIntegration.isActive, true))
        .limit(1);

      if (!config || !booking.googleSheetsRowId) {
        return; // No Google Sheets integration or row ID
      }

      const values = [
        [
          booking.updatedAt,
          booking.customerName,
          booking.customerEmail,
          booking.customerPhone,
          booking.eventType,
          booking.eventDate,
          booking.startTime,
          booking.endTime,
          booking.numberOfGuests,
          booking.budget || '',
          booking.specialRequests || '',
          booking.status,
        ],
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: config.sheetId,
        range: `Banquet Bookings!${booking.googleSheetsRowId}:L`,
        valueInputOption: 'RAW',
        resource: {
          values,
        },
      });
    } catch (error) {
      console.error('Error updating banquet booking in Google Sheets:', error);
      throw error;
    }
  }

  async getBanquetBookings() {
    try {
      await this.initializeAuth();

      const [config] = await db
        .select()
        .from(googleSheetsIntegration)
        .where(eq(googleSheetsIntegration.isActive, true))
        .limit(1);

      if (!config) {
        throw new Error('No active Google Sheets configuration found');
      }

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: config.sheetId,
        range: 'Banquet Bookings!A:L',
      });

      return response.data.values;
    } catch (error) {
      console.error('Error fetching banquet bookings from Google Sheets:', error);
      throw error;
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
