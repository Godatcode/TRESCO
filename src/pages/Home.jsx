import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ArrowRight, MapPin, Calendar, Utensils } from "lucide-react";
import SectionHeading from "../components/SectionHeading";


const Home = () => {
  const { isDarkMode } = useTheme();
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch random quote about wisdom/culture
  const fetchQuote = async () => {
    try {
      // Adding a timestamp query parameter to prevent caching
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent('https://zenquotes.io/api/random')}?t=${new Date().getTime()}`
      );
  
      if (!response.ok) throw new Error("Failed to fetch quote.");
  
      const result = await response.json(); // Get wrapped response
      const parsed = JSON.parse(result.contents); // Parse the actual content
  
      setQuote({
        text: parsed[0].q,
        author: parsed[0].a,
      });
      setIsLoading(false); // Set loading to false after fetching is complete
    } catch (error) {
      setError("Error fetching quote");
      setIsLoading(false); // Stop loading even if an error occurs
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // Parallax effect for hero section
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Categories with icons - these are UI elements so can remain static
  const categories = [
    {
      id: 1,
      title: "Destinations",
      description: "Explore magical cities and sacred sites",
      icon: <MapPin className="h-8 w-8" />,
      color: "bg-blue-600"
    },
    {
      id: 2,
      title: "Festivals",
      description: "Experience vibrant celebrations and traditions",
      icon: <Calendar className="h-8 w-8" />,
      color: "bg-red-600"
    },
    {
      id: 3,
      title: "Cuisine",
      description: "Savor diverse regional flavors and spices",
      icon: <Utensils className="h-8 w-8" />,
      color: "bg-amber-600"
    }
  ];

  return (
    <>
{/* Hero Section with YouTube Video Background */}
<section className="relative h-screen flex items-center overflow-hidden">
  {/* Video Background */}
  <div className="absolute inset-0 z-[-1]">
  <video
  className="absolute inset-0 w-full h-full object-cover z-[-1]"
  src="/videoplayback.mp4"
  autoPlay
  muted
  loop
  playsInline
/>
    {/* Black Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  {/* Content */}
  <div className="relative container mx-auto px-4 z-10">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
        Discover the Rich Tapestry of India
      </h1>
      <p className="text-xl text-white/90 mb-8">
        Immerse yourself in a journey through vibrant traditions, diverse cultures,
        and breathtaking experiences across the Indian subcontinent.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/explore"
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium px-8 py-3 rounded-full hover:shadow-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300"
        >
          Start Exploring
        </Link>
        <Link
          to="/heritage"
          className="bg-white/10 backdrop-blur-sm text-white border border-white/30 font-medium px-8 py-3 rounded-full hover:bg-white/20 transition-all duration-300"
        >
          Cultural Heritage
        </Link>
      </div>
    </div>
  </div>

  {/* Gradient at Bottom */}
  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
</section>

      {/* Quote Section */}
      <section className="py-12 bg-slate-100 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mx-auto"></div>
              </div>
            </div>
          ) : error ? (
            <div className="max-w-4xl mx-auto text-center text-slate-600 dark:text-slate-400">
              <p>{error}</p>
            </div>
          ) : quote && (
            <blockquote className="max-w-4xl mx-auto text-center">
              <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 mb-4">
                "{quote.text}"
              </p>
              <cite className="text-lg text-slate-600 dark:text-slate-400 not-italic">
                &mdash; {quote.author}
              </cite>
            </blockquote>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <SectionHeading 
            subtitle="Explore" 
            title="Discover India's Cultural Treasures" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group bg-white dark:bg-slate-800 rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`${category.color} text-white p-4 rounded-lg inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {category.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {category.description}
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center text-red-600 dark:text-orange-400 font-medium hover:underline"
                >
                  Discover More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading 
            subtitle="Featured" 
            title="Unmissable Indian Experiences" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Featured Experience 1 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 h-64 rounded-lg overflow-hidden">
                <img
                  src="https://housing.com/news/wp-content/uploads/2023/03/Colours-of-Holi-What-is-the-significance-of-different-colours-f.jpg"
                  alt="Holi Festival"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                  Holi: Festival of Colors
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Experience the vibrant celebration that marks the arrival of spring,
                  where people come together to throw colored powders and water at each other.
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center text-red-600 dark:text-orange-400 font-medium hover:underline"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            
            {/* Featured Experience 2 */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 h-64 rounded-lg overflow-hidden">
                <img
                  src="https://deih43ym53wif.cloudfront.net/meenakshi-temple-india-shutterstock_196460390_447752956f.jpeg"
                  alt="Architectural Wonders"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                  Architectural Wonders
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Marvel at the stunning Taj Mahal, explore ancient forts, and discover
                  the diverse architectural heritage that spans centuries of history.
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center text-red-600 dark:text-orange-400 font-medium hover:underline"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Magic of India?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Embark on a journey through time, culture, and tradition.
            Discover the countless stories waiting to be told.
          </p>
          <Link
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className="bg-white text-red-600 font-medium px-8 py-3 rounded-full hover:bg-white/90 transition-all duration-300"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;