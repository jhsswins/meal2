/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { NutritionMenuItem } from "../types";
import { generateCalculatorMenuItems } from "../mockData";
import NutritionSummaryCard from "./NutritionSummaryCard";
import MenuFilterChips, { FilterCategoryType } from "./MenuFilterChips";
import SelectableMenuItem from "./SelectableMenuItem";
import { Calculator, Save, AlertCircle, Heart } from "lucide-react";

export default function NutritionCalculatorScreen() {
  // Load initial selection list
  const [menuItems, setMenuItems] = useState<NutritionMenuItem[]>(() => 
    generateCalculatorMenuItems()
  );

  const [selectedCategory, setSelectedCategory] = useState<FilterCategoryType>("전체");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Filter list of items to show on UI
  const filteredItems = useMemo(() => {
    if (selectedCategory === "전체") return menuItems;
    return menuItems.filter((item) => item.category === selectedCategory);
  }, [menuItems, selectedCategory]);

  // Compute total macro aggregations
  const computedTotals = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    menuItems.forEach((item) => {
      if (item.selected) {
        calories += item.calories;
        protein += item.protein;
        carbs += item.carbs;
        fat += item.fat;
      }
    });

    return { calories, protein, carbs, fat };
  }, [menuItems]);

  // Toggle item selected state
  const handleToggleItem = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
    // Reset save status if selected options change
    setSaveStatus(null);
  };

  // Categories list
  const categories: FilterCategoryType[] = ["전체", "밥류", "국/찌개", "반찬", "디저트"];

  // Handle Save
  const handleSaveResult = () => {
    // Show a success message
    setSaveStatus("영양 계산 결과가 김학생 회원님의 마이페이지 급식 식단 일지에 안전하게 저장되었습니다!");
    // clear after 6 seconds
    setTimeout(() => setSaveStatus(null), 6000);
  };

  return (
    <div className="screen flex flex-col gap-6 animate-fade-in" id="calculator-screen-root">
      {/* Title section */}
      <div className="flex flex-col gap-1 border-b border-soft-gray/60 pb-3" id="calc-header-desc">
        <span className="text-secondary/90 font-bold text-xs sm:text-sm tracking-wide uppercase">
          영양 계산기
        </span>
        <h2 className="font-bold text-xl sm:text-2xl text-deep-olive flex items-center gap-2" id="calc-main-title">
          <Calculator className="w-5 h-5 text-deep-olive" />
          <span>영양 자가 진단 계산기</span>
        </h2>
      </div>

      {/* Grid Layout: Desktop Side-by-side, Mobile Stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="calc-grid-layout">
        
        {/* Left Side (Desktop: 5 cols, sticky summary panel) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-4" id="calc-summary-panel">
          <NutritionSummaryCard
            calories={computedTotals.calories}
            protein={computedTotals.protein}
            carbs={computedTotals.carbs}
            fat={computedTotals.fat}
          />
          
          {/* Action Save Button */}
          <button
            onClick={handleSaveResult}
            disabled={computedTotals.calories === 0}
            id="save-nutrition-btn"
            className="w-full bg-deep-olive hover:bg-lime-850 text-card-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all duration-200 cursor-pointer active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-deep-olive"
          >
            <Save className="w-4.5 h-4.5" />
            <span>계산 결과 저장하기</span>
          </button>

          {/* Toast feedback */}
          {saveStatus && (
            <div 
              className="bg-lime-800/10 border border-deep-olive text-deep-olive p-3.5 rounded-xl text-xs font-semibold leading-relaxed animate-fade-in"
              id="calc-success-toast"
            >
              🎉 {saveStatus}
            </div>
          )}
        </div>

        {/* Right Side (Desktop: 7 cols, menu lists) */}
        <div className="lg:col-span-7 flex flex-col gap-4" id="calc-selection-panel">
          <div className="flex justify-between items-center bg-soft-gray/30 p-3 rounded-xl" id="calc-selection-header">
            <span className="text-xs font-bold text-text-dark/70">
              오늘의 희망 메뉴를 조합하고 열량을 테스트해 보세요.
            </span>
            <span className="text-xs bg-deep-olive/10 text-deep-olive px-2.5 py-0.5 rounded-full font-bold">
              {menuItems.filter(m => m.selected).length}개 선택됨
            </span>
          </div>

          {/* Filter Chips row */}
          <MenuFilterChips
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Menu Items Grid/List */}
          <div className="flex flex-col gap-3" id="calc-items-list-container">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <SelectableMenuItem
                  key={item.id}
                  item={item}
                  onToggle={handleToggleItem}
                />
              ))
            ) : (
              <div 
                className="bg-card-white border border-soft-gray p-12 rounded-xl text-center text-text-dark/50 text-sm flex flex-col items-center justify-center gap-2"
                id="filtered-empty"
              >
                <AlertCircle className="w-8 h-8 text-text-dark/20" />
                <span>선택한 카테고리에 제공되는 세부 항목이 아직 없습니다.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
