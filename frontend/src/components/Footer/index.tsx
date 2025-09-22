import { Link } from "react-router";

const Index = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      {/* Top Section: Quick Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Company Section */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
            <li><Link to="/services" className="hover:text-black">Services</Link></li>
            <li><Link to="/reviews" className="hover:text-black">Reviews</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">Help Center</a></li>
            <li><a href="#" className="hover:text-black">Contact Us</a></li>
            <li><a href="#" className="hover:text-black">Safety</a></li>
          </ul>
        </div>

        {/* Explore Section */}
        <div>
          <h4 className="text-sm font-semibold uppercase mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-black">Offers</a></li>
            <li><Link to="/rides" className="hover:text-black">Student Rides</Link></li>
            <li><a href="#" className="hover:text-black">Become a Driver</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Branding & Legal */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Left: Branding */}
          <div className="mb-2 md:mb-0">
            © {new Date().getFullYear()} PeerRide. All rights reserved.
          </div>

          {/* Right: Legal Links */}
          <div className="space-x-4">
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Index;
