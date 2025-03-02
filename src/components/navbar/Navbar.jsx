import { useState } from "react";

import { Menu, X } from "lucide-react"; // Icons for mobile menu
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1a1a2e] text-white shadow-lg">
      <div className="container mx-auto px-5 md:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#ffcc00]">
            StudioBooking
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-[#ffcc00] transition">Home</Link>
            <Link to="/studios" className="hover:text-[#ffcc00] transition">Studios</Link>
            <Link to="/bookings" className="hover:text-[#ffcc00] transition">Bookings</Link>
            <Link to="/contact" className="hover:text-[#ffcc00] transition">Contact</Link>
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
        <div className="md:hidden bg-[#1a1a2e] py-3 space-y-2 text-center">
          <Link to="/" className="block py-2 hover:text-[#ffcc00]" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/studios" className="block py-2 hover:text-[#ffcc00]" onClick={() => setIsOpen(false)}>Studios</Link>
          <Link to="/bookings" className="block py-2 hover:text-[#ffcc00]" onClick={() => setIsOpen(false)}>Bookings</Link>
          <Link to="/contact" className="block py-2 hover:text-[#ffcc00]" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
