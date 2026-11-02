import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Check, 
  X, 
  Shield, 
  Lock, 
  ChevronRight, 
  ChevronLeft,
  DollarSign,
  Sparkles,
  Award,
  Bell,
  Settings
} from 'lucide-react';

// --- DATA ---
const SERVICES = [
  {
    id: 'mens-haircut',
    name: 'Regular Mens Haircut',
    price: 20,
    duration: '1 hr',
    description: 'Includes tapers, fades, and trims.',
  },
  {
    id: 'haircut-design',
    name: 'Regular Haircut with Design',
    price: 25,
    duration: '1 hr 15 mins',
    description: 'Includes tapers, fades, trims + custom hair artwork/design.',
  },
  {
    id: 'beard-sculpting',
    name: 'Beard Sculpting & Razor Lineup',
    price: 15,
    duration: '30 mins',
    description: 'Crisp beard trim, hot towel, and razor finish.',
  }
];

const STYLISTS = [
  {
    id: 'ej',
    name: 'Ejblends',
    role: 'Master Barber & Founder',
    rating: 5.0,
    reviews: 142,
    specialty: 'Fades, Tapers & Custom Designs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  }
];

const TIME_SLOTS = [
  '09:00 AM', '10:15 AM', '11:30 AM', 
  '01:00 PM', '02:15 PM', '03:30 PM', 
  '04:45 PM', '06:00 PM'
];

export default function App() {
  const [activeTab, setActiveTab] = useState('book'); // 'book', 'my-bookings', 'admin'
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState(false);

  // Booking state
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedStylist, setSelectedStylist] = useState(STYLISTS[0]);
  const [selectedDate, setSelectedDate] = useState('2026-06-01');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Client Form info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Notifications & Bookings Data
  const [bookings, setBookings] = useState([
    {
      id: 'EJ-8492',
      serviceName: 'Regular Mens Haircut',
      price: 20,
      duration: '1 hr',
      stylistName: 'Ejblends',
      date: '2026-06-01',
      time: '10:15 AM',
      clientName: 'Marcus Vance',
      clientPhone: '(503) 555-0192',
      clientEmail: 'marcus@example.com',
      notes: 'Low skin fade please',
      status: 'confirmed'
    }
  ]);
  
  const [smsAlertsNumber, setSmsAlertsNumber] = useState('(503) 555-EJBLENDS');
  const [recentSmsToast, setRecentSmsToast] = useState(null);
  
  // Barber Calendar management
  const [blockedDates, setBlockedDates] = useState([]);
  const [walkInModalOpen, setWalkInModalOpen] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInTime, setWalkInTime] = useState('12:00 PM');

  // Handle Booking Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime || !clientName || !clientPhone) {
      alert('Please fill out all required fields and select a time slot.');
      return;
    }

    const newBooking = {
      id: 'EJ-' + Math.floor(1000 + Math.random() * 9000),
      serviceName: selectedService.name,
      price: selectedService.price,
      duration: selectedService.duration,
      stylistName: selectedStylist.name,
      date: selectedDate,
      time: selectedTime,
      clientName,
      clientPhone,
      clientEmail,
      notes: clientNotes,
      status: 'confirmed'
    };

    setBookings([newBooking, ...bookings]);

    // Trigger SMS simulation to Barber's Phone
    setRecentSmsToast(`New booking from ${clientName} for ${selectedService.name} on ${selectedDate} at ${selectedTime}! Sent to ${smsAlertsNumber}`);
    setTimeout(() => setRecentSmsToast(null), 6000);

    setActiveTab('my-bookings');
    // Reset form
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setClientNotes('');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPin === '1234') {
      setIsAdminLoggedIn(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* SMS Simulated Alert Toast */}
      {recentSmsToast && (
        <div className="fixed top-5 right-5 z-50 bg-sky-950 border border-sky-500 text-sky-200 px-5 py-4 rounded-xl shadow-2xl flex items-start gap-3 max-w-md animate-bounce">
          <Bell className="w-6 h-6 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm text-sky-100">📱 LIVE SMS to Barber ({smsAlertsNumber})</div>
            <div className="text-sm mt-1">{recentSmsToast}</div>
          </div>
          <button onClick={() => setRecentSmsToast(null)} className="text-sky-400 hover:text-white ml-2">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-sky-500 p-2.5 rounded-xl shadow-lg shadow-sky-500/30 text-slate-950">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-slate-200 to-sky-400 bg-clip-text text-transparent">
                Ejblends Studios
              </h1>
              <p className="text-xs text-sky-400 font-medium tracking-widest uppercase">Precision Fades & Grooming</p>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('book')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'book' ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Book a Cut
            </button>
            <button 
              onClick={() => setActiveTab('my-bookings')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'my-bookings' ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              My Appointments
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'admin' ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20' : 'text-sky-400 border border-sky-500/30 hover:bg-sky-500/10'
              }`}
            >
              <Shield className="w-4 h-4" /> Barber Mode
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-10">

        {/* ================= TAB 1: BOOKING WIZARD ================= */}
        {activeTab === 'book' && (
          <div className="space-y-10 animate-fade-in">
            
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-8 md:p-12">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30 mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> Book Online Instantly
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                  Fresh Cuts & Sharp Fades by <span className="text-sky-400">Ejblends</span>
                </h2>
                <p className="text-slate-400 text-base md:text-lg mb-6">
                  Select your service, pick your preferred date and time on the calendar, and secure your chair in seconds.
                </p>
                <div className="flex items-center gap-6 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" /> Tapers & Fades
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" /> Custom Designs
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form Layout */}
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-8">

                {/* Step 1: Select Service */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <span className="w-7 h-7 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center text-sm font-extrabold">1</span>
                    Select Your Service
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    {SERVICES.map((service) => (
                      <div 
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={`cursor-pointer rounded-xl p-5 border transition-all flex items-center justify-between ${
                          selectedService.id === service.id 
                            ? 'bg-sky-500/10 border-sky-500 shadow-lg shadow-sky-500/10' 
                            : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-lg text-white">{service.name}</h4>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {service.duration}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mt-1">{service.description}</p>
                        </div>
                        <div className="text-right pl-4">
                          <span className="text-2xl font-black text-sky-400">${service.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Date & Time Selection with Calendar */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <span className="w-7 h-7 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center text-sm font-extrabold">2</span>
                    Choose Date & Time Slot
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Select Date</label>
                      <div className="relative">
                        <input 
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
                        />
                        <CalendarIcon className="w-5 h-5 text-sky-400 absolute right-4 top-3.5 pointer-events-none" />
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Ejblends is available Monday through Saturday.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Available Time Slots</label>
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2.5 px-3 rounded-lg text-sm font-semibold border transition-all ${
                              selectedTime === time
                                ? 'bg-sky-500 text-slate-950 border-sky-500 shadow-md shadow-sky-500/20'
                                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Client Details */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <span className="w-7 h-7 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center text-sm font-extrabold">3</span>
                    Your Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Full Name *</label>
                      <input 
                        type="text"
                        required
                        placeholder="John Doe"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number *</label>
                      <input 
                        type="tel"
                        required
                        placeholder="(503) 000-0000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                      <input 
                        type="email"
                        placeholder="john@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-400 mb-1">Styling Notes / Requests</label>
                      <textarea 
                        rows="2"
                        placeholder="Skin fade low, keep length on top..."
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Booking Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-28 shadow-2xl">
                  <h3 className="text-xl font-bold border-b border-slate-800 pb-4 mb-4">Appointment Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs text-slate-400">Service</div>
                        <div className="font-bold text-white">{selectedService.name}</div>
                        <div className="text-xs text-sky-400 mt-0.5">{selectedService.duration}</div>
                      </div>
                      <div className="text-lg font-black text-sky-400">${selectedService.price}</div>
                    </div>

                    <div className="border-t border-slate-800/60 pt-3">
                      <div className="text-xs text-slate-400">Barber</div>
                      <div className="font-semibold text-white flex items-center gap-2 mt-1">
                        <img src={selectedStylist.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        {selectedStylist.name}
                      </div>
                    </div>

                    <div className="border-t border-slate-800/60 pt-3">
                      <div className="text-xs text-slate-400">Date & Time</div>
                      <div className="font-semibold text-white mt-1 flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-sky-400" />
                        {selectedDate || 'Select date'} {selectedTime ? `@ ${selectedTime}` : ''}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-4 rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    Confirm Booking <ChevronRight className="w-5 h-5" />
                  </button>

                  <p className="text-xs text-center text-slate-500 mt-4">
                    No payment required online. Pay securely in chair after your haircut.
                  </p>
                </div>
              </div>

            </form>
          </div>
        )}

        {/* ================= TAB 2: MY APPOINTMENTS ================= */}
        {activeTab === 'my-bookings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black">Your Scheduled Appointments</h2>
                <p className="text-sm text-slate-400">View upcoming cuts booked at Ejblends Studios.</p>
              </div>
              <button 
                onClick={() => setActiveTab('book')}
                className="bg-sky-500 text-slate-950 px-4 py-2 rounded-xl font-bold text-sm hover:bg-sky-400"
              >
                + Book Another Cut
              </button>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                <CalendarIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Appointments Found</h3>
                <p className="text-slate-400 text-sm mb-6">You haven't booked any haircuts yet.</p>
                <button 
                  onClick={() => setActiveTab('book')}
                  className="bg-sky-500 text-slate-950 px-6 py-3 rounded-xl font-bold"
                >
                  Book Your First Cut
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-bold">{b.id}</span>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">{b.status}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-white">{b.serviceName}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                        <span className="flex items-center gap-1.5"><CalendarIcon className="w-4 h-4 text-sky-400" /> {b.date} at {b.time}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-sky-400" /> {b.duration}</span>
                        <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-sky-400" /> {b.clientName}</span>
                      </div>
                      {b.notes && <p className="text-xs text-slate-400 italic">Notes: "{b.notes}"</p>}
                    </div>

                    <div className="flex items-center gap-4 justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Total Price</div>
                        <div className="text-2xl font-black text-sky-400">${b.price}</div>
                      </div>
                      <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to cancel this appointment?')) {
                            setBookings(bookings.filter(item => item.id !== b.id));
                          }
                        }}
                        className="p-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-all"
                        title="Cancel Appointment"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: BARBER MODE (SECURED BY PIN) ================= */}
        {activeTab === 'admin' && (
          <div className="space-y-8 animate-fade-in">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
                <div className="w-16 h-16 bg-sky-500/20 text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-sky-500/30">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black mb-2">Ejblends Barber Portal</h2>
                <p className="text-sm text-slate-400 mb-6">Enter your security PIN to access the calendar and incoming bookings.</p>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input 
                    type="password"
                    maxLength="4"
                    placeholder="Enter 4-digit PIN (default: 1234)"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full text-center tracking-widest text-2xl bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500"
                  />
                  {pinError && <p className="text-xs text-rose-400 font-semibold">Incorrect PIN. Try '1234'.</p>}
                  <button 
                    type="submit"
                    className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-3 rounded-xl transition-all shadow-lg shadow-sky-500/20"
                  >
                    Unlock Barber Dashboard
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8">
                
                {/* Admin Header & Stats */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div>
                    <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">Barber Admin Dashboard</span>
                    <h2 className="text-2xl font-black text-white">Welcome back, Ejblends!</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setWalkInModalOpen(true)}
                      className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-4 py-2.5 rounded-xl text-sm font-bold shadow-md"
                    >
                      + Add Walk-In Cut
                    </button>
                    <button 
                      onClick={() => setIsAdminLoggedIn(false)}
                      className="border border-slate-700 hover:bg-slate-800 px-4 py-2.5 rounded-xl text-sm font-semibold"
                    >
                      Lock Portal
                    </button>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="text-xs font-semibold text-slate-400 uppercase">Incoming Bookings</div>
                    <div className="text-3xl font-black text-white mt-2">{bookings.length}</div>
                    <div className="text-xs text-sky-400 mt-1">Live sync active</div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="text-xs font-semibold text-slate-400 uppercase">SMS Alert Number</div>
                    <div className="text-lg font-bold text-white mt-2 flex items-center justify-between">
                      {smsAlertsNumber}
                      <button 
                        onClick={() => {
                          const num = prompt('Enter your mobile number for SMS notifications:', smsAlertsNumber);
                          if (num) setSmsAlertsNumber(num);
                        }}
                        className="text-xs text-sky-400 hover:underline"
                      >
                        Change
                      </button>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Receive texts on bookings</div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="text-xs font-semibold text-slate-400 uppercase">Shop Status</div>
                    <div className="text-lg font-bold text-emerald-400 mt-2 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span> Open for Booking
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Clients can book online</div>
                  </div>
                </div>

                {/* Calendar Management & Bookings Queue */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Incoming Queue */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-xl font-bold">Incoming Bookings Queue</h3>
                    {bookings.length === 0 ? (
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
                        No bookings in queue.
                      </div>
                    ) : (
                      bookings.map((b) => (
                        <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-bold">{b.id}</span>
                            <span className="text-lg font-black text-sky-400">${b.price}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-xs text-slate-400">Client Name</div>
                              <div className="font-bold text-white">{b.clientName}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{b.clientPhone}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-400">Service & Time</div>
                              <div className="font-bold text-white">{b.serviceName}</div>
                              <div className="text-xs text-sky-400 mt-0.5">{b.date} @ {b.time} ({b.duration})</div>
                            </div>
                          </div>

                          {b.notes && (
                            <div className="bg-slate-950 p-3 rounded-xl text-xs text-slate-300">
                              <span className="font-bold text-sky-400">Client Notes:</span> {b.notes}
                            </div>
                          )}

                          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                            <button 
                              onClick={() => {
                                setBookings(bookings.filter(item => item.id !== b.id));
                              }}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-rose-400 border border-rose-500/30 hover:bg-rose-500/10"
                            >
                              Remove / Cancel
                            </button>
                            <a 
                              href={`tel:${b.clientPhone}`}
                              className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 flex items-center gap-1.5"
                            >
                              <Phone className="w-3.5 h-3.5" /> Call Client
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Calendar Management Panel */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                      <h3 className="text-lg font-bold mb-4">Calendar & Hours Control</h3>
                      <p className="text-xs text-slate-400 mb-4">Manage your availability or block off days you are closed.</p>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-2">Block Off a Date</label>
                          <div className="flex gap-2">
                            <input 
                              type="date" 
                              id="block-date-input"
                              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full"
                            />
                            <button 
                              onClick={() => {
                                const val = document.getElementById('block-date-input').value;
                                if (val && !blockedDates.includes(val)) {
                                  setBlockedDates([...blockedDates, val]);
                                  alert(`Blocked date ${val} successfully.`);
                                }
                              }}
                              className="bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 px-3 py-2 rounded-xl text-xs font-bold"
                            >
                              Block
                            </button>
                          </div>
                        </div>

                        {blockedDates.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-slate-400 mb-2">Currently Blocked Dates:</div>
                            <div className="space-y-1">
                              {blockedDates.map(d => (
                                <div key={d} className="flex items-center justify-between bg-slate-950 px-3 py-1.5 rounded-lg text-xs">
                                  <span>{d}</span>
                                  <button 
                                    onClick={() => setBlockedDates(blockedDates.filter(item => item !== d))}
                                    className="text-rose-400 hover:text-white"
                                  >
                                    Unblock
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Walk-in Modal */}
      {walkInModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Add Walk-In Client</h3>
              <button onClick={() => setWalkInModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Client Name</label>
                <input 
                  type="text" 
                  placeholder="Walk-In Client"
                  value={walkInName}
                  onChange={(e) => setWalkInName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Time Slot</label>
                <select 
                  value={walkInTime}
                  onChange={(e) => setWalkInTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                >
                  {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setWalkInModalOpen(false)} className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:bg-slate-800">
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!walkInName) return alert('Enter walk-in name');
                  const newWalkIn = {
                    id: 'WALK-' + Math.floor(100 + Math.random() * 900),
                    serviceName: 'Regular Mens Haircut (Walk-In)',
                    price: 20,
                    duration: '1 hr',
                    stylistName: 'Ejblends',
                    date: new Date().toISOString().split('T')[0],
                    time: walkInTime,
                    clientName: walkInName,
                    clientPhone: 'Walk-In',
                    clientEmail: '',
                    notes: 'In-chair walk-in client',
                    status: 'confirmed'
                  };
                  setBookings([newWalkIn, ...bookings]);
                  setWalkInModalOpen(false);
                  setWalkInName('');
                }}
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-5 py-2 rounded-xl text-sm font-bold"
              >
                Save Walk-In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 mt-20 py-8 text-center text-xs text-slate-500">
        <p>&copy; 2026 Ejblends Studios. All rights reserved. Powered by Precision Booking.</p>
      </footer>
    </div>
  );
}