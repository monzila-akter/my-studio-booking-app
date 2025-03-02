import React, { useEffect, useState } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from localStorage when the component mounts
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookingDetails')) || [];
    setBookings(storedBookings);
  }, []);

  return (
    <div className="bg-gray-100 py-10">
      <h1 className="text-4xl text-center text-gray-900 font-semibold mb-8">Booking List</h1>
      
      {bookings.length === 0 ? (
        <div className="text-center text-gray-600">No bookings found.</div>
      ) : (
        <div className="overflow-x-auto mx-auto max-w-6xl px-4">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-gray-700">User Name</th>
                <th className="px-6 py-3 text-left text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-gray-700">Studio Type</th>
                <th className="px-6 py-3 text-left text-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-gray-700">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 text-gray-700">{booking.userInfo.name}</td>
                  <td className="px-6 py-4 text-gray-700">{booking.userInfo.email}</td>
                  <td className="px-6 py-4 text-gray-700">{booking.studio.Type}</td>
                  <td className="px-6 py-4 text-gray-700">{booking.studio.Location?.City}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(booking.startDate).toLocaleDateString()} at {booking.startTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
