"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface BanquetBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  numberOfGuests: number;
  budget?: number;
  specialRequests?: string;
  status: string;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
}

interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  numberOfGuests: number;
  reservationDate: string;
  reservationTime: string;
  duration: number;
  status: string;
  specialRequests?: string;
  table: {
    number: number;
    capacity: number;
    location?: string;
  };
  createdAt: string;
}

export default function AdminPanel() {
  const router = useRouter();
  const [banquetBookings, setBanquetBookings] = useState<BanquetBooking[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        if (data.user.role === 'customer') {
          router.push('/');
          return;
        }
        fetchData();
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    }
  };

  const fetchData = async () => {
    try {
      const [banquetRes, contactRes, reservationRes] = await Promise.all([
        fetch('/api/banquet'),
        fetch('/api/contact'),
        fetch('/api/reservations'),
      ]);

      const [banquetData, contactData, reservationData] = await Promise.all([
        banquetRes.json(),
        contactRes.json(),
        reservationRes.json(),
      ]);

      setBanquetBookings(banquetData.bookings || []);
      setContactMessages(contactData.messages || []);
      setReservations(reservationData.reservations || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (type: string, id: string, status: string) => {
    try {
      const endpoint = type === 'banquet' ? `/api/banquet/${id}` : 
                     type === 'contact' ? `/api/contact/${id}` : 
                     `/api/reservations/${id}`;
      
      await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, icon: Clock },
      confirmed: { variant: 'default' as const, icon: CheckCircle },
      cancelled: { variant: 'destructive' as const, icon: XCircle },
      completed: { variant: 'outline' as const, icon: CheckCircle },
      new: { variant: 'secondary' as const, icon: Clock },
      in_progress: { variant: 'default' as const, icon: Clock },
      resolved: { variant: 'outline' as const, icon: CheckCircle },
      closed: { variant: 'destructive' as const, icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Woodvale Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage bookings, reservations, and customer inquiries</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="banquet">Banquet Bookings</TabsTrigger>
            <TabsTrigger value="reservations">Table Reservations</TabsTrigger>
            <TabsTrigger value="contact">Contact Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Banquet Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{banquetBookings.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {banquetBookings.filter(b => b.status === 'pending').length} pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Table Reservations</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reservations.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {reservations.filter(r => r.status === 'pending').length} pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{contactMessages.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {contactMessages.filter(m => m.status === 'new').length} new
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="banquet" className="space-y-4">
            <div className="grid gap-4">
              {banquetBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{booking.customerName}</h3>
                        <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                        <p className="text-sm text-gray-600">{booking.eventType} • {booking.numberOfGuests} guests</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(booking.eventDate)} {booking.startTime} - {booking.endTime}
                        </p>
                        {booking.budget && (
                          <p className="text-sm font-medium text-green-600">Budget: ${booking.budget}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(booking.status)}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus('banquet', booking.id, 'confirmed')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus('banquet', booking.id, 'cancelled')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {booking.specialRequests && (
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">{booking.specialRequests}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reservations" className="space-y-4">
            <div className="grid gap-4">
              {reservations.map((reservation) => (
                <Card key={reservation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{reservation.customerName}</h3>
                        <p className="text-sm text-gray-600">{reservation.customerEmail}</p>
                        <p className="text-sm text-gray-600">
                          Table {reservation.table.number} • {reservation.numberOfGuests} guests
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(reservation.reservationDate)} {reservation.reservationTime}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(reservation.status)}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus('reservation', reservation.id, 'confirmed')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus('reservation', reservation.id, 'cancelled')}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {reservation.specialRequests && (
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">{reservation.specialRequests}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid gap-4">
              {contactMessages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold">{message.name}</h3>
                        <p className="text-sm text-gray-600">{message.email}</p>
                        <p className="text-sm font-medium">{message.subject}</p>
                        <p className="text-sm text-gray-600">{formatDate(message.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(message.status)}
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus('contact', message.id, 'in_progress')}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus('contact', message.id, 'resolved')}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-700">{message.message}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
