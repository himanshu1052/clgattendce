import React from "react";
import { Link } from "react-router-dom";
import { Youtube, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import Logo from "../assets/ITS.jpg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "http://its.edu.in/Default.aspx" },
  { name: "Academics", path: "https://www.its.edu.in/Default.aspx" },
  { name: "Admissions", path: "https://www.its.edu.in/AdmissionOpen.aspx?TagId=68" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <img
              src={Logo}
              alt="ITS Logo"
              className="h-16 w-auto object-contain mix-blend-multiply filter brightness-0 invert mb-4"
            />
            <p className="text-gray-400 mb-4">
              ITS Ghaziabad is committed to providing quality education and creating future leaders through innovative learning approaches.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.path.startsWith("http") ? (
                    <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Programs</h3>
            <ul className="space-y-2 text-gray-400">
              <li>PGDM</li>
              <li>MCA</li>
              <li>BCA</li>
              <li>BBA</li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                Mohan Nagar, Ghaziabad, Uttar Pradesh 201007
              </p>
              <p className="flex items-center">
                <Phone size={20} className="mr-2" />
                +91 120-4814800
              </p>
              <p className="flex items-center">
                <Mail size={20} className="mr-2" />
                info@its.edu.in
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ITS Ghaziabad. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Youtube size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
