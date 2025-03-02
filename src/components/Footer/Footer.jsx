
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a2e] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Logo & Branding */}
          <div>
            <h2 className="text-2xl font-bold text-[#ffcc00]">StudioBooking</h2>
            <p className="mt-2 text-gray-400">
              Your one-stop solution for booking studios easily and efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#ffcc00]">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><Link to="/" className="hover:text-[#ffcc00] transition">Home</Link></li>
              <li><Link to="/studios" className="hover:text-[#ffcc00] transition">Studios</Link></li>
              <li><Link to="/bookings" className="hover:text-[#ffcc00] transition">Bookings</Link></li>
              <li><Link to="/contact" className="hover:text-[#ffcc00] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-[#ffcc00]">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <a href="#" className="text-gray-400 hover:text-[#ffcc00] transition">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ffcc00] transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ffcc00] transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#ffcc00] transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} StudioBooking. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
