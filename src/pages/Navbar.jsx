import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight, Phone, Mail, ChevronDown } from "lucide-react";
import Logo from "../assets/ITS.jpg";

const navLinks = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "About",
    path: "http://its.edu.in/Default.aspx",
    external: true
  },
  {
    name: "Academics",
    path: "https://www.its.edu.in/Default.aspx",
    external: true
  },
  {
    name: "Admissions",
    path: "https://www.its.edu.in/AdmissionOpen.aspx?TagId=68",
    external: true
  },
  {
    name: "Contact",
    path: "/contact"
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [location]);

  const handleNavigation = (path, external = false) => {
    if (external) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  const NavLink = ({ item, mobile = false }) => {
    const isActive = location.pathname === item.path;
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <div className="relative group">
        <div
          className={`
            ${mobile ? 'py-3 px-4 border-b border-gray-100' : 'px-4 py-2'}
            ${isActive ? 'text-red-700' : 'text-gray-700'}
            flex items-center justify-between cursor-pointer
            hover:text-red-700 transition-colors duration-200
          `}
          onClick={() => {
            if (hasSubmenu) {
              setActiveSubmenu(activeSubmenu === item.name ? null : item.name);
            } else {
              handleNavigation(item.path, item.external);
            }
          }}
        >
          <span className="font-medium">{item.name}</span>
          {hasSubmenu && (
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform duration-200
                ${activeSubmenu === item.name ? 'rotate-180' : ''}`}
            />
          )}
        </div>

        {/* Submenu */}
        {hasSubmenu && (
          <div
            className={`
              ${mobile ? 'relative bg-gray-50' : 'absolute left-0 mt-0 bg-white shadow-lg rounded-lg min-w-[200px]'}
              ${mobile ? (activeSubmenu === item.name ? 'block' : 'hidden') : 'group-hover:block hidden'}
              z-50
            `}
          >
            {item.submenu.map((subItem) => (
              <div
                key={subItem.name}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 hover:text-red-700"
                onClick={() => handleNavigation(subItem.path)}
              >
                {subItem.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Top Bar */}
      <div className={`bg-red-700 text-white transition-all duration-300 
        ${isScrolled ? 'py-1' : 'py-2'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="hidden sm:flex items-center space-x-4">
            <span className="flex items-center hover:text-red-200 transition-colors">
              <Phone size={14} className="mr-1" />
              <a href="tel:+911204814800">+91 120-4814800</a>
            </span>
            <span className="flex items-center hover:text-red-200 transition-colors">
              <Mail size={14} className="mr-1" />
              <a href="mailto:info@its.edu.in">info@its.edu.in</a>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={Logo}
                alt="ITS Logo"
                className={`transition-all duration-300 object-contain mix-blend-multiply
                  ${isScrolled ? 'h-12' : 'h-16'}`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
              <button
                onClick={() => navigate("/apply")}
                className="ml-4 bg-red-700 text-white px-6 py-2 rounded-full font-semibold
                         hover:bg-red-800 transition duration-300 flex items-center
                         transform hover:scale-105"
              >
                Apply Now <ChevronRight size={16} className="ml-1" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300
            ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={`absolute right-0 top-0 h-screen w-4/5 max-w-sm bg-white shadow-lg
              transform transition-transform duration-300 ease-in-out
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="overflow-y-auto h-full pt-16 pb-6">
              {navLinks.map((item) => (
                <NavLink key={item.name} item={item} mobile={true} />
              ))}
              <div className="px-4 mt-4">
                <button
                  onClick={() => navigate("/apply")}
                  className="w-full bg-red-700 text-white px-6 py-3 rounded-full font-semibold
                           hover:bg-red-800 transition duration-300 flex items-center justify-center"
                >
                  Apply Now <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
