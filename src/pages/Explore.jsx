import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import ExploreCard from "../components/ExploreCard";
import Loading from "../components/Loading";
import SectionHeading from "../components/SectionHeading";
import { Search, Filter } from "lucide-react";
import supabase from "../api/supabaseClient";

const CATEGORIES = ["All", "Festivals", "Monuments", "Food", "Art", "Nature"];

const Explore = () => {
  const { isDarkMode } = useTheme();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("cultural_experiences")
          .select("*");

        if (error) throw new Error(error.message);

        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on category and search term
  useEffect(() => {
    if (items.length === 0) return;

    let result = [...items];

    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower) ||
          item.location.toLowerCase().includes(lower)
      );
    }

    setFilteredItems(result);
  }, [activeCategory, searchTerm, items]);

  const resetFilters = () => {
    setActiveCategory("All");
    setSearchTerm("");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg"
            alt="India Cultural Tapestry"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore India's Cultural Wonders</h1>
            <p className="text-xl text-white/80 mb-0">
              Discover festivals, cuisine, art forms, and ancient monuments that showcase India's rich heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white dark:bg-slate-800 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-orange-400"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              <Filter className="hidden md:block text-slate-500 dark:text-slate-400 h-5 w-5 mr-1" />
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-red-600 dark:bg-orange-600 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900 min-h-[50vh]">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <Loading message="Discovering cultural experiences..." />
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600 dark:bg-orange-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-orange-700"
              >
                Try Again
              </button>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4">No experiences found</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-red-600 dark:bg-orange-600 text-white rounded-lg hover:bg-red-700 dark:hover:bg-orange-700"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-end mb-8">
                <SectionHeading
                  title={activeCategory === "All" ? "Cultural Experiences" : activeCategory}
                  subtitle="Discover"
                  alignment="left"
                  className="mb-0"
                />
                <p className="text-slate-600 dark:text-slate-400">
                  Showing {filteredItems.length}{" "}
                  {filteredItems.length === 1 ? "experience" : "experiences"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <ExploreCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Explore;