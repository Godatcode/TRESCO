import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import HeritageCard from "../components/HeritageCard"; // Import HeritageCard component
import Loading from "../components/Loading";
import SectionHeading from "../components/SectionHeading";
import { BookOpen } from "lucide-react";  // Add this line to import BookOpen

const Heritage = () => {
  const { isDarkMode } = useTheme();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch cultural events from the festivals.json file
  const fetchCulturalEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Change this path to where your festivals.json is located
      const response = await fetch("/festivals.json");
      if (!response.ok) throw new Error("Failed to load cultural events");

      const data = await response.json();
      setEvents(data);  // Assuming festivals.json is directly an array
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCulturalEvents();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-slate-900">
          <img
            src="https://images.pexels.com/photos/5759988/pexels-photo-5759988.jpeg"
            alt="Indian Heritage"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-orange-400 border border-orange-400 rounded-full px-4 py-1 text-sm font-medium mb-6">
              Cultural Heritage
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Preserving India's Living Heritage
            </h1>
            <p className="text-xl text-white/80 mb-0">
              Explore the traditions, art forms, and cultural practices that
              have shaped the Indian subcontinent for millennia.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <span className="inline-block text-sm font-medium text-red-600 dark:text-orange-400 uppercase tracking-wider mb-2">
                Featured
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                India's UNESCO World Heritage Sites
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                India is home to 40 UNESCO World Heritage Sites, including
                cultural landmarks, natural wonders, and mixed-category sites.
                From the iconic Taj Mahal to the ancient Ajanta Caves, these
                sites showcase the country's exceptional cultural significance
                and natural beauty.
              </p>
              <div className="flex items-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-orange-400 mb-1">32</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Cultural Sites</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-orange-400 mb-1">7</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Natural Sites</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-orange-400 mb-1">1</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Mixed Site</div>
                </div>
              </div>
              <button className="inline-flex items-center bg-red-600 dark:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-orange-700 transition-colors">
                <BookOpen className="h-5 w-5 mr-2" />
                Explore Heritage Sites
              </button>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/784879/pexels-photo-784879.jpeg"
                  alt="Taj Mahal"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">UNESCO Site</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">Taj Mahal, Agra</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Events & Festivals Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading subtitle="Discover" title="Cultural Events & Festivals" />
          {isLoading ? (
            <Loading message="Loading cultural events..." />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={fetchCulturalEvents}
                className="px-6 py-2 bg-red-600 dark:bg-orange-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-orange-700"
              >
                Try Again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-slate-400">
              No upcoming cultural events found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, index) => (
                <HeritageCard key={index} article={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Heritage;