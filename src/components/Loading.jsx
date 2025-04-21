import { useTheme } from "../context/ThemeContext";

const Loading = ({ message = "Loading..." }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 rounded-full border-4 border-dashed animate-spin border-red-600 dark:border-orange-400"></div>
        <div className="absolute inset-3 rounded-full border-4 border-dashed animate-spin border-orange-500 dark:border-red-500 animate-[spin_2s_linear_infinite]"></div>
      </div>
      <p className="mt-4 text-slate-700 dark:text-slate-300">{message}</p>
    </div>
  );
};

export default Loading;