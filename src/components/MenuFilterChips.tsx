/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FilterCategoryType = "전체" | "밥류" | "국/찌개" | "반찬" | "디저트";

interface MenuFilterChipsProps {
  categories: FilterCategoryType[];
  selectedCategory: FilterCategoryType;
  onSelectCategory: (category: FilterCategoryType) => void;
}

export default function MenuFilterChips({
  categories,
  selectedCategory,
  onSelectCategory,
}: MenuFilterChipsProps) {
  return (
    <section 
      className="flex gap-2 overflow-x-auto pb-1.5 -mx-4 px-4 scrollbar-none hide-scrollbar"
      id="menu-filter-chips-scrollbar"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {categories.map((category) => {
        const isActive = category === selectedCategory;
        return (
          <button
            key={category}
            id={`filter-chip-${category}`}
            onClick={() => onSelectCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-deep-olive text-card-white shadow-xs scale-105"
                : "bg-soft-gray/55 border border-soft-gray text-text-dark/80 hover:bg-soft-gray hover:text-text-dark"
            }`}
          >
            {category}
          </button>
        );
      })}
    </section>
  );
}
