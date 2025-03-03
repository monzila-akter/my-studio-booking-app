import React, { useEffect, useState } from 'react';
import { FaRegClock, FaStar } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import GooglePlacesAutocomplete from 'react-google-autocomplete';
import toast from 'react-hot-toast';
import { debounce } from 'lodash'; // Import debounce from lodash

const Studios = () => {
  const [studios, setStudios] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationSearch, setLocationSearch] = useState('');
  const [radius, setRadius] = useState(10);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filteredStudios, setFilteredStudios] = useState([]);

  // Fetch studios data
  useEffect(() => {
    fetch('/studios.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStudios(data);
        setFilteredStudios(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });

    // Get current user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setCurrentLocation({ lat: userLat, lng: userLng });
          filterStudiosByRadius(userLat, userLng, radius);
        },
        (error) => {
          toast.error('Error getting location:', error);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Debounced search function
  const debouncedSearch = debounce((value) => {
    filterStudiosByAddress(value);
  }, 300);

  // Handle search input change
  const handleSearchChange = (value) => {
    setLocationSearch(value);
    debouncedSearch(value);
  };

  // Handle place selection
  const handlePlaceSelect = (place) => {
    setLocationSearch(place.formatted_address);
    filterStudiosByAddress(place.formatted_address);
  };

  // Filter studios by address (city/area)
  const filterStudiosByAddress = (address) => {
    const filtered = studios.filter((studio) =>
      studio.Location.City.toLowerCase().includes(address.toLowerCase()) || 
      studio.Location.Area.toLowerCase().includes(address.toLowerCase()) 
    );
    setFilteredStudios(filtered);
  };

  // Filter studios by radius
  const filterStudiosByRadius = (lat, lng, radius) => {
    const filtered = studios.filter((studio) => {
      const distance = getDistance(
        lat,
        lng,
        studio.Location.Coordinates.Latitude,
        studio.Location.Coordinates.Longitude
      );
      return distance <= radius;
    });
    setFilteredStudios(filtered);
  };

  // Calculate distance between two points
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  // Handle radius change
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    if (currentLocation) {
      filterStudiosByRadius(currentLocation.lat, currentLocation.lng, newRadius);
    }
  };

  // Open modal for booking
  const openModal = (studio) => {
    setSelectedStudio(studio);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle booking
  const handleBooking = () => {
    if (!startDate || !startTime || !userInfo.name || !userInfo.email) {
      toast.error('Please fill out all fields before booking.');
      return;
    }

    const availability = selectedStudio?.Availability;
    const bookingData = {
      userInfo,
      startDate: startDate.toISOString(),
      startTime,
      studio: selectedStudio,
    };

    // Check if the selected time is within the studio's availability
    if (startTime >= availability?.Open && startTime <= availability?.Close) {
      // Get existing bookings from localStorage
      const currentBookings = JSON.parse(localStorage.getItem('bookingDetails')) || [];

      // Check if the time slot is already booked
      const isSlotBooked = currentBookings.some(
        (booking) =>
          booking.studio.Id === selectedStudio.Id &&
          new Date(booking.startDate).toDateString() === startDate.toDateString() &&
          booking.startTime === startTime
      );

      if (isSlotBooked) {
        toast.error('The selected time slot is not available. Please choose another time.');
      } else {
        // Add the new booking to the list
        currentBookings.push(bookingData);

        // Save the updated bookings to localStorage
        localStorage.setItem('bookingDetails', JSON.stringify(currentBookings));
        toast.success('Booking successful!');
        closeModal();
      }
    } else {
      toast.error('Selected time slot is unavailable. Please choose another time.');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="text-xl font-semibold text-teal-950">Loading....</span>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 py-10 mt-14 lg:mt-16">
      <h1 className="text-4xl text-center text-teal-950 font-semibold mb-8">Studio List</h1>

      {/* Search Bar for Place */}
      <div className="flex justify-center mb-4">
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_googleApiKey}
          onSelect={handlePlaceSelect}
          onChange={(e) => handleSearchChange(e.target.value)} // Add this line
          debounce={500}
          placeholder="Search by location"
          options={{
            types: ['(regions)'],
            componentRestrictions: { country: 'bd' },
          }}
          className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Search by Radius */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => handleRadiusChange(10)}
          className="bg-teal-950 text-white font-medium py-2 px-4 rounded-lg hover:bg-teal-900 transition-all"
        >
          Search within 10 km
        </button>
        <button
          onClick={() => handleRadiusChange(20)}
          className="bg-teal-950 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-900 transition-all ml-4"
        >
          Search within 20 km
        </button>
      </div>

      {/* Studio List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-5 container mx-auto">
        {filteredStudios.map((studio) => (
          <div
            key={studio.Id}
            className="bg-white p-6 rounded-lg shadow-lg transition-all hover:shadow-2xl flex flex-col"
          >
            <h2 className="text-2xl font-semibold text-teal-950 mb-2">{studio.Name}</h2>
            <p className="text-gray-600 mb-2">Type: {studio.Type}</p>
            <p className="text-gray-600 text-sm">Location: {studio.Location.Address}</p>
            <p className="text-gray-600 text-sm">Description: {studio.Description}</p>
            <div className="flex flex-wrap gap-2 my-4">
              {studio.Amenities?.map((feature, index) => (
                <span
                  key={index}
                  className="bg-teal-100 text-teal-950 text-sm px-3 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-gray-800 mb-4">
              <p className="font-bold">
                {studio.PricePerHour} {studio.Currency} / hour
              </p>
              <div className="flex items-center text-yellow-500">
                <FaStar className="mr-1" />
                <p>{studio.Rating}</p>
              </div>
            </div>
            {/* Book Now Button */}
            <div className="mt-auto">
              <button
                className="w-full bg-teal-950 text-white py-2 rounded-lg hover:bg-teal-900 font-semibold transition-all"
                onClick={() => openModal(studio)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="max-w-md mx-auto mt-32 border-2 bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Book {selectedStudio?.Name}
        </h2>
        <div className="space-y-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select a date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-950"
          />
          <div className="flex items-center space-x-2">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-950"
            />
            <FaRegClock className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-950"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-950"
          />
          <button
            className="w-full bg-teal-950 text-white py-2 rounded-lg hover:bg-teal-900 transition-all"
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