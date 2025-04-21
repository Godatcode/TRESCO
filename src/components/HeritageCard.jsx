import { useTheme } from "../context/ThemeContext";
import { ArrowUpRight } from "lucide-react";


const HeritageCard = ({ article }) => {
  const { isDarkMode } = useTheme();

  if (!article) return null;

  const { id, title, content_text, image_url } = article;

  // Generate a consistent color based on the article ID
  const colorIndex = id % 5;
  const colors = [
    "bg-red-100 border-red-600 dark:bg-red-900/30 dark:border-red-600",
    "bg-orange-100 border-orange-600 dark:bg-orange-900/30 dark:border-orange-600",
    "bg-amber-100 border-amber-600 dark:bg-amber-900/30 dark:border-amber-600",
    "bg-blue-100 border-blue-600 dark:bg-blue-900/30 dark:border-blue-600",
    "bg-emerald-100 border-emerald-600 dark:bg-emerald-900/30 dark:border-emerald-600",
  ];

  return (
    <article
      className={`${colors[colorIndex]} border-l-4 rounded-r-lg overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-slate-700/20`}
    >
      {image_url && (
        <img
          src={image_url}
          alt={title}
          className="w-full h-56 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 capitalize">
          {title}
        </h3>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          {content_text.substring(0, 120)}...
        </p>
        <a
          href="#"
          className="inline-flex items-center text-red-600 dark:text-orange-400 font-medium hover:underline"
        >
          Read Article
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </a>
      </div>
    </article>
  );
};

export default HeritageCard;