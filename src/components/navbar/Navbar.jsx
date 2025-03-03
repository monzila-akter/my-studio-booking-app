import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import { Link, useLocation } from "react-router"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  // Function Checking of active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full bg-teal-950 text-white shadow-lg z-50">
      <div className="container mx-auto px-5 md:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#ffcc00]">
            Studio<span className="text-white">Booking</span>
          </Link>

          {/* Desktop/Tablet  Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`hover:text-[#ffcc00] transition ${isActive("/") ? "text-[#ffcc00]" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/studios"
              className={`hover:text-[#ffcc00] transition ${isActive("/studios") ? "text-[#ffcc00]" : ""}`}
            >
              Studios
            </Link>
            <Link
              to="/bookings"
              className={`hover:text-[#ffcc00] transition ${isActive("/bookings") ? "text-[#ffcc00]" : ""}`}
            >
              Bookings
            </Link>
            <Link
              to="/contact"
              className={`hover:text-[#ffcc00] transition ${isActive("/contact") ? "text-[#ffcc00]" : ""}`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-teal-900 py-3 space-y-2 text-center">
          <Link
            to="/"
            className={`block py-2 hover:text-[#ffcc00] ${isActive("/") ? "text-[#ffcc00]" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/studios"
            className={`block py-2 hover:text-[#ffcc00] ${isActive("/studios") ? "text-[#ffcc00]" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Studios
          </Link>
          <Link
            to="/bookings"
            className={`block py-2 hover:text-[#ffcc00] ${isActive("/bookings") ? "text-[#ffcc00]" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Bookings
          </Link>
          <Link
            to="/contact"
            className={`block py-2 hover:text-[#ffcc00] ${isActive("/contact") ? "text-[#ffcc00]" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
