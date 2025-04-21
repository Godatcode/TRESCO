import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                TRESCO
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-300 max-w-xs">
              Discover the vibrant tapestry of India's rich cultural heritage through immersive experiences.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/_a_rk_a_/" target="_blank" className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-orange-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://x.com/God_at_Code" target="_blank" className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-orange-400 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://www.facebook.com/arka.ghosh.94043" target="_blank" className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-orange-400 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Explore", "Heritage", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Discover</h3>
            <ul className="space-y-2">
              {["Festivals", "Cuisines", "Architecture", "Art Forms", "History"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-red-600 dark:text-orange-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">
                      Electronic City,Phase I<br />
                      Bangalore,560100<br />
                      India
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-red-600 dark:text-orange-400 mr-2 flex-shrink-0" />
                <a
                  href="mailto:info@tresco.com"
                  className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-orange-400 transition-colors"
                >
                  info@tresco.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-red-600 dark:text-orange-400 mr-2 flex-shrink-0" />
                <a
                  href="tel:+911234567890"
                  className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-orange-400 transition-colors"
                >
                  +91 3249834988
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center text-slate-600 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} TRESCO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;