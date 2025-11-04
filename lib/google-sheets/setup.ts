import { db, googleSheetsIntegration } from '../db';
import { eq } from 'drizzle-orm';

export async function setupGoogleSheets() {
  console.log('🔧 Setting up Google Sheets integration...');

  try {
    // Check if Google Sheets is already configured
    const existingConfig = await db
      .select()
      .from(googleSheetsIntegration)
      .where(eq(googleSheetsIntegration.isActive, true))
      .limit(1);

    if (existingConfig.length > 0) {
      console.log('✅ Google Sheets already configured');
      return;
    }

    // Check for environment variables
    const credentialsPath = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const sheetId = process.env.GOOGLE_SHEETS_ID;

    if (!credentialsPath || !sheetId) {
      console.log('⚠️  Google Sheets not configured. Set GOOGLE_SHEETS_CREDENTIALS and GOOGLE_SHEETS_ID in .env.local');
      return;
    }

    // Load credentials from file
    const fs = await import('fs');
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

    // Create Google Sheets configuration
    await db.insert(googleSheetsIntegration).values({
      sheetId,
      sheetUrl: `https://docs.google.com/spreadsheets/d/${sheetId}`,
      credentials,
      isActive: true,
    });

    console.log('✅ Google Sheets integration configured');
    console.log(`📊 Sheet URL: https://docs.google.com/spreadsheets/d/${sheetId}`);

  } catch (error) {
    console.error('❌ Error setting up Google Sheets:', error);
    console.log('💡 Make sure GOOGLE_SHEETS_CREDENTIALS points to a valid JSON file');
  }
}
