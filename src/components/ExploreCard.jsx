import { useState } from "react";
import { ChevronRight } from "lucide-react";

const ExploreCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!item) return null;

  const { title, description, image, location, category } = item;

  return (
    <article
      className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <span className="absolute bottom-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-full">
          {category}
        </span>
        <span className="absolute bottom-4 right-4 flex items-center text-white text-sm">
          <span>{location}</span>
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        <button
          className="flex items-center text-red-600 dark:text-orange-400 font-medium text-sm hover:underline transition-colors"
          aria-label={`Learn more about ${title}`}
        >
          Learn More{" "}
          <ChevronRight
            className={`h-4 w-4 ml-1 transition-transform duration-300 ${
              isHovered ? "translate-x-1" : ""
            }`}
          />
        </button>
      </div>
    </article>
  );
};

export default ExploreCard;