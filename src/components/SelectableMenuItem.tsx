/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Check } from "lucide-react";
import { NutritionMenuItem } from "../types";

interface SelectableMenuItemProps {
  key?: string;
  item: NutritionMenuItem;
  onToggle: (id: string) => void;
}

export default function SelectableMenuItem({ item, onToggle }: SelectableMenuItemProps) {
  const { id, name, calories, description, allergens, selected } = item;

  // Render allergen warnings inside selection menu
  const containsAllergen = allergens.length > 0;

  return (
    <button
      onClick={() => onToggle(id)}
      id={`selectable-menu-item-${id}`}
      className={`w-full text-left rounded-xl p-4 flex items-center justify-between shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.99] border-2 ${
        selected
          ? "bg-sage-green/15 border-deep-olive"
          : "bg-card-white border-soft-gray/80 hover:bg-soft-gray/30"
      }`}
    >
      <div className="flex flex-col gap-1" id={`menu-desc-container-${id}`}>
        <span className="font-bold text-sm sm:text-base text-text-dark" id={`menu-name-${id}`}>
          {name}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-text-dark/60" id={`menu-meta-${id}`}>
          <span>{calories} kcal</span>
          <span>•</span>
          {containsAllergen ? (
            <span className="text-error font-medium" id={`menu-allergy-alert-${id}`}>
              {allergens.join(", ")} 함유
            </span>
          ) : (
            <span id={`menu-ingredients-${id}`}>{description}</span>
          )}
        </div>
      </div>

      {/* Check circle */}
      <div 
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
          selected
            ? "bg-deep-olive text-card-white"
            : "border-2 border-soft-gray bg-card-white"
        }`}
        id={`menu-check-indicator-${id}`}
      >
        {selected && <Check className="w-4 h-4" />}
      </div>
    </button>
  );
}
