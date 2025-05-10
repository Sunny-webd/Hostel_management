import React from "react";
import "./Footer.css"; // Import CSS file

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-500 text-sm">
                  Email: support@hostel.com
                </li>
                <li className="text-gray-500 text-sm">
                  Phone: +1 234 567 890
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/dashboard" className="text-gray-500 hover:text-gray-900 text-sm">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/rooms" className="text-gray-500 hover:text-gray-900 text-sm">
                    Rooms
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-500 hover:text-gray-900 text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-500 hover:text-gray-900 text-sm">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Hostel Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
