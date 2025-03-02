import React, { useEffect, useState } from 'react';
import { FaRegClock, FaStar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';

const Studios = () => {
  const [studios, setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Use useEffect to fetch the data from the public folder
  useEffect(() => {
    fetch('/studios.json') // Path to your studios.json file in the public folder
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON if the response is successful
      })
      .then((data) => {
        setStudios(data); // Update state with fetched data
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error.message); // Set error state if there's an issue
        setIsLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  // Open the booking modal
  const openModal = (studio) => {
    setSelectedStudio(studio);
    setIsModalOpen(true);
  };

  // Close the booking modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle booking
const handleBooking = () => {
    const availability = selectedStudio?.Availability;
    const bookingData = { userInfo, startDate, startTime, studio: selectedStudio };
  
    // Check availability (for demo, we assume the selected time is always available)
    if (startTime >= availability?.Open && startTime <= availability?.Close) {
      // Get the current list of bookings from localStorage
      const currentBookings = JSON.parse(localStorage.getItem('bookingDetails')) || [];
  
      // Add the new booking to the list
      currentBookings.push(bookingData);
  
      // Store the updated list of bookings in localStorage
      localStorage.setItem('bookingDetails', JSON.stringify(currentBookings));
  
      alert('Booking successful!');
      closeModal();
    } else {
      alert('Selected time slot is unavailable. Please choose another time.');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message if something went wrong
  }

  return (
    <div className="bg-gray-100 py-10">
      <h1 className="text-4xl text-center text-gray-900 font-semibold mb-8">Studio List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {studios.map((studio) => (
          <div key={studio.Id} className="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <img
              src={studio.Images[0] || "https://via.placeholder.com/300"} // Use the first image from the array or a placeholder
              alt={studio.Name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{studio.Name}</h2>
            <p className="text-gray-600 mb-2">Type: {studio.Type}</p>
            <p className="text-gray-600 text-sm">Location: {studio.Location.Address}</p>
            <p className="text-gray-600 text-sm">Description: {studio.Description}</p>
            <div className="flex flex-wrap gap-2 my-4">
              {studio.Amenities?.map((feature, index) => (
                <span key={index} className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-gray-800 mb-4">
              <p className="font-bold">{studio.PricePerHour} {studio.Currency} / hour</p>
              <div className="flex items-center text-yellow-500">
                <FaStar className="mr-1" />
                <p>{studio.Rating}</p>
              </div>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => openModal(studio)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Book {selectedStudio?.Name}</h2>
        <div className="space-y-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select a date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-2">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaRegClock className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Studios;
