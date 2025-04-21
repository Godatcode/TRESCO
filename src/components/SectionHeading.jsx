const SectionHeading = ({ subtitle, title, alignment = "center", className = "" }) => {
  const alignClass = {
    center: "text-center mx-auto",
    left: "text-left",
    right: "text-right ml-auto"
  };

  return (
    <div className={`max-w-3xl mb-12 ${alignClass[alignment]} ${className}`}>
      {subtitle && (
        <span className="inline-block text-sm font-medium text-red-600 dark:text-orange-400 uppercase tracking-wider mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
        {title}
      </h2>
      <div
        className={`h-1 w-20 mt-4 rounded-full mb-4 
        mx-auto md:mx-0 md:ml-0 lg:ml-0 
        bg-gradient-to-r from-red-600 to-orange-500 dark:from-orange-400 dark:to-yellow-300`}
      ></div>
    </div>
  );
};

export default SectionHeading;