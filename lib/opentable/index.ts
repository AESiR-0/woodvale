/**
 * OpenTable Integration Service
 * 
 * This service handles syncing reservations with OpenTable.
 * To use OpenTable API, you'll need to:
 * 1. Apply for OpenTable API partnership at https://www.opentable.com/restaurant-solutions/api-partners/
 * 2. Get API credentials (API key, restaurant ID, etc.)
 * 3. Configure environment variables
 */

interface OpenTableReservation {
  firstName: string;
  lastName: string;
  customerName?: string;
  customerEmail: string;
  customerPhone?: string;
  phoneCountryCode?: string;
  numberOfGuests: number;
  reservationDate: Date;
  reservationTime: string; // HH:MM format
  occasion?: string;
  specialRequests?: string;
}

interface OpenTableConfig {
  apiKey?: string;
  restaurantId?: string;
  apiUrl?: string;
}

class OpenTableService {
  private config: OpenTableConfig;

  constructor() {
    this.config = {
      apiKey: process.env.OPENTABLE_API_KEY,
      restaurantId: process.env.OPENTABLE_RESTAURANT_ID,
      apiUrl: process.env.OPENTABLE_API_URL || 'https://api.opentable.com/v1',
    };
  }

  /**
   * Check if OpenTable is configured
   */
  isConfigured(): boolean {
    return !!(this.config.apiKey && this.config.restaurantId);
  }

  /**
   * Create a reservation in OpenTable
   */
  async createReservation(reservation: OpenTableReservation): Promise<string | null> {
    if (!this.isConfigured()) {
      console.log('⚠️  OpenTable not configured. Set OPENTABLE_API_KEY and OPENTABLE_RESTAURANT_ID in .env.local');
      return null;
    }

    try {
      // Convert reservation time to OpenTable format
      const [hours, minutes] = reservation.reservationTime.split(':').map(Number);
      const reservationDateTime = new Date(reservation.reservationDate);
      reservationDateTime.setHours(hours, minutes, 0, 0);

      // Format request body for OpenTable API
      // Note: Actual API structure may vary - adjust based on OpenTable API documentation
      const requestBody = {
        restaurant_id: this.config.restaurantId,
        party_size: reservation.numberOfGuests,
        reservation_datetime: reservationDateTime.toISOString(),
        diner_first_name: reservation.firstName,
        diner_last_name: reservation.lastName,
        diner_email: reservation.customerEmail,
        diner_phone: reservation.phoneCountryCode ? `${reservation.phoneCountryCode}${reservation.customerPhone}` : reservation.customerPhone || '',
        occasion: reservation.occasion || '',
        special_requests: reservation.specialRequests || '',
      };

      const response = await fetch(`${this.config.apiUrl}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Restaurant-ID': this.config.restaurantId || '',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ OpenTable API error:', response.status, errorText);
        throw new Error(`OpenTable API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Reservation created in OpenTable:', data.id || data.reservation_id);
      
      // Return OpenTable reservation ID
      return data.id || data.reservation_id || null;
    } catch (error) {
      console.error('❌ Error creating OpenTable reservation:', error);
      throw error;
    }
  }

  /**
   * Update a reservation in OpenTable
   */
  async updateReservation(
    openTableReservationId: string,
    reservation: Partial<OpenTableReservation>
  ): Promise<boolean> {
    if (!this.isConfigured()) {
      console.log('⚠️  OpenTable not configured');
      return false;
    }

    try {
      const requestBody: any = {};
      
      if (reservation.numberOfGuests) requestBody.party_size = reservation.numberOfGuests;
      if (reservation.reservationDate && reservation.reservationTime) {
        const [hours, minutes] = reservation.reservationTime.split(':').map(Number);
        const reservationDateTime = new Date(reservation.reservationDate);
        reservationDateTime.setHours(hours, minutes, 0, 0);
        requestBody.reservation_datetime = reservationDateTime.toISOString();
      }
      if (reservation.specialRequests) requestBody.special_requests = reservation.specialRequests;

      const response = await fetch(`${this.config.apiUrl}/reservations/${openTableReservationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Restaurant-ID': this.config.restaurantId || '',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ OpenTable API update error:', response.status, errorText);
        return false;
      }

      console.log('✅ Reservation updated in OpenTable');
      return true;
    } catch (error) {
      console.error('❌ Error updating OpenTable reservation:', error);
      return false;
    }
  }

  /**
   * Cancel a reservation in OpenTable
   */
  async cancelReservation(openTableReservationId: string): Promise<boolean> {
    if (!this.isConfigured()) {
      console.log('⚠️  OpenTable not configured');
      return false;
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/reservations/${openTableReservationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Restaurant-ID': this.config.restaurantId || '',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ OpenTable API cancel error:', response.status, errorText);
        return false;
      }

      console.log('✅ Reservation cancelled in OpenTable');
      return true;
    } catch (error) {
      console.error('❌ Error cancelling OpenTable reservation:', error);
      return false;
    }
  }

  /**
   * Get OpenTable widget script URL
   * This is used for embedding OpenTable's reservation widget on the website
   */
  getWidgetUrl(): string | null {
    const restaurantId = this.config.restaurantId;
    if (!restaurantId) {
      return null;
    }
    
    // OpenTable widget URL format (may vary based on your OpenTable account)
    return `https://www.opentable.com/widget/reservation/loader?rid=${restaurantId}&type=standard&theme=standard&color=1&dark=false&lang=en&overlay=false&domain=com`;
  }
}

export const openTableService = new OpenTableService();
export default openTableService;

