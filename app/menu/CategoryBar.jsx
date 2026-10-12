"use client";

import { useRouter } from "next/navigation";

export default function CategoryBar({
  categories,
  selectedCategory = "All",
}) {
  const router = useRouter();

  function selectCategory(category) {
    const slug = category.toLowerCase();
    const url =
      category === "All"
        ? "/menu"
        : `/menu?category=${encodeURIComponent(slug)}`;

    router.push(url);
  }

  return (
    <nav
      aria-label="Filter menu by category"
      className="mt-4 flex flex-wrap gap-2"
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => selectCategory(category)}
            aria-pressed={isSelected}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isSelected
                ? "border-orange-600 bg-orange-600 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            {category}
          </button>
        );
      })}
    </nav>
  );
}
