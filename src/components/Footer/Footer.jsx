
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-teal-950 text-white py-8">
      <div className="container mx-auto px-5 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Logo & short description */}
          <div>
            <h2 className="text-2xl font-bold text-[#ffcc00]">StudioBooking</h2>
            <p className="mt-2 text-white">
              Your one-stop solution for booking studios easily and efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div className="ml-0 md:ml-10 lg:ml-20">
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
              <a href="https://www.facebook.com/monzila.akter2" className="text-white hover:text-[#ffcc00] transition">
                <FaFacebookF size={20} />
              </a>
              <a href="https://www.instagram.com/monzila_akter/" className="text-white hover:text-[#ffcc00] transition">
                <FaInstagram size={20} />
              </a>
              <a href="https://x.com/monzila_akter" className="text-white hover:text-[#ffcc00] transition">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/monzila-akter-1446291b4/" className="text-white hover:text-[#ffcc00] transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-white text-sm border-t border-white pt-4">
          &copy; {new Date().getFullYear()} StudioBooking. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
