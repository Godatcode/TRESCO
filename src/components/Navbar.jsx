import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Check if the navbar should be transparent or solid
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Heritage", path: "/heritage" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-sm" 
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={closeMenu}
        >
          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
            TRESCO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-red-600 dark:hover:text-orange-400 ${
                  location.pathname === link.path
                    ? "text-red-600 dark:text-orange-400 font-medium"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-orange-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-orange-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-700 dark:text-slate-200" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700 dark:text-slate-200" />
            )}
          </button>
        </div>
      </nav>

{/* Mobile Menu */}
<div
  className={`md:hidden overflow-hidden transition-all duration-300 ${
    isMenuOpen ? "max-h-screen" : "max-h-0"
  } bg-white dark:bg-slate-900 shadow-lg`}
>
  <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
    {navLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={`py-2 text-lg transition-colors ${
          location.pathname === link.path
            ? "text-red-600 dark:text-orange-400 font-medium"
            : "text-slate-700 dark:text-slate-200"
        }`}
        onClick={closeMenu}
      >
        {link.name}
      </Link>
    ))}
  </div>
</div>
    </header>
  );
};

export default Navbar;