import React from "react";

const CategoryCard = ({ image, title, href = "#" }) => {
  return (
    <a
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
    >
      <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-colors duration-200 group-hover:from-red-50 group-hover:via-white group-hover:to-rose-50">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="pointer-events-none absolute inset-0 rounded-xl border border-white/70 shadow-inner" />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm font-semibold text-gray-700">
        <span className="truncate">{title}</span>
        <span className="text-red-500 transition-transform duration-200 group-hover:translate-x-1">
          {"\u2192"}
        </span>
      </div>
    </a>
  );
};

export default CategoryCard;
