/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MealData } from "../types";
import { cleanDishName } from "../utils";
import AllergyChips from "./AllergyChips";

interface MealCardProps {
  meal: MealData;
  showProteinIndicator?: boolean;
}

export default function MealCard({ meal, showProteinIndicator = true }: MealCardProps) {
  const { mealType, totalCalories, dishes, allergens, nutrition } = meal;

  // Choose the visual background photo based on meal type
  const lunchPhoto = "https://lh3.googleusercontent.com/aida-public/AB6AXuC_NKEL0tHIySFN2CBNz7ktIhT82txypB0bfYapH1-qFWo2tLoM4SmH2MSAq12hG0hzA_iOZFKRjHcBpUR3tLc80Fhmpd56Uif3ib2TXR1X-GNus_kfhBrE5LwOCGuKi4kQ6e0TRINuZIEywcJB104gQj8BYpyEz0N-tQp2xLV8FYz7mj7_mxXJRX3dKNJpnSnVhhUlCf3l-QvTCwL35D_fdvLF4aPu8uozooDkPzi_WONWx-4xMnD67DO6_qwouLsb6gl4bPTPzW0g";
  const dinnerPhoto = "https://lh3.googleusercontent.com/aida-public/AB6AXuAabwGUrsWIO8uqZZbOV5vjxKaYT_m2i7gDH4lMC73VU8FN_TQrIzydsRvBB65ymJJAqyU1u5hNC7NEgkW9x2tY1esSZ_WAx03RqdugOiWjusuKKue17GfWgBM4Kjy3ii8QeA6WdmQwRdwRULNCzQ31SdcNXSLoavtbq-1ATnirRS4enEuRd_2nzKuo0dk2vEktVkbBkj-HLxVKpq24QNpkh2ETGo1eTe5tN2CCKHea1rHBfVxwwU5ICsZoOcP9bx-kc7d_RQW3EvzH";
  const bgPhoto = mealType === "중식" ? lunchPhoto : dinnerPhoto;

  // Let's assume some protein targets to calculate protein achievement rates
  // Targets: 30g for lunch, 25g for dinner
  const targetProtein = mealType === "중식" ? 35 : 30;
  // Calculate percentage: protein / target
  const proteinGrams = nutrition.protein || 24;
  const achievementRate = Math.min(100, Math.round((proteinGrams / targetProtein) * 100));

  return (
    <article 
      className="meal-card bg-card-white rounded-2xl overflow-hidden shadow-warm-soft border border-soft-gray/70 hover:shadow-md transition-all duration-300 flex flex-col"
      id={`meal-card-${meal.id}`}
    >
      {/* Upper image area with title & calorie indicators */}
      <div 
        className="h-36 relative bg-soft-gray/80 bg-cover bg-center overflow-hidden" 
        style={{ backgroundImage: `url('${bgPhoto}')` }}
        id={`meal-header-bg-${meal.id}`}
      >
        {/* Soft shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A241A]/70 via-[#2A241A]/20 to-transparent"></div>
        
        {/* Texts overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-card-white">
          <span className="font-bold text-lg md:text-xl drop-shadow-md" id={`meal-tag-type-${meal.id}`}>
            {mealType}
          </span>
          <span className="text-xs md:text-sm font-semibold bg-deep-olive/80 px-2 py-0.5 rounded-full drop-shadow-md" id={`meal-tag-calorie-${meal.id}`}>
            {totalCalories} kcal
          </span>
        </div>
      </div>

      {/* Main details list */}
      <div className="p-4 flex flex-col justify-between flex-grow" id={`meal-body-${meal.id}`}>
        <div>
          {/* Flat Bullet List */}
          <ul className="space-y-1.5 font-medium text-sm text-text-dark/90" id={`meal-dishes-ul-${meal.id}`}>
            {dishes.map((dish, idx) => (
              <li 
                key={`${dish}_${idx}`} 
                id={`dish-item-${meal.id}-${idx}`}
                className="flex items-center gap-2 "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-olive-green/75 flex-shrink-0" id={`dish-bullet-${meal.id}-${idx}`}></span>
                <span>{cleanDishName(dish)}</span>
              </li>
            ))}
          </ul>

          {/* Allergy warnings */}
          <div className="mt-3" id={`meal-allergens-box-${meal.id}`}>
            <AllergyChips allergens={allergens} />
          </div>
        </div>

        {/* Protein target indicator (Weekly & home metrics) */}
        {showProteinIndicator && (
          <div className="mt-4 pt-3 border-t border-soft-gray/60" id={`meal-protein-status-${meal.id}`}>
            <div className="flex justify-between items-center text-xs font-semibold mb-1">
              <span className="text-text-dark/70">단백질 달성률 ({proteinGrams}g)</span>
              <span className="text-deep-olive">{achievementRate}%</span>
            </div>
            
            <div className="w-full bg-soft-gray rounded-full h-1.5 overflow-hidden" id={`meal-progress-bar-container-${meal.id}`}>
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  achievementRate >= 80 ? "bg-deep-olive" : "bg-olive-green/60"
                }`}
                style={{ width: `${achievementRate}%` }}
                id={`meal-progress-fill-${meal.id}`}
              ></div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
