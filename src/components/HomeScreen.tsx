/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MealData, TabType } from "../types";
import { formatKoreanDate } from "../utils";
import HeroMealCard from "./HeroMealCard";
import MealCard from "./MealCard";
import { Utensils, Heart, Share2, Info, ChevronRight, CalendarDays } from "lucide-react";

interface HomeScreenProps {
  selectedDate: Date;
  mealsForToday: MealData[];
  isWeekend: boolean;
  onNavigateToTab: (tab: TabType) => void;
  allWeekDates: Date[];
  allMealsForWeek: MealData[];
}

export default function HomeScreen({
  selectedDate,
  mealsForToday,
  isWeekend,
  onNavigateToTab,
  allWeekDates,
  allMealsForWeek
}: HomeScreenProps) {
  const formattedDate = formatKoreanDate(selectedDate);

  // Separate lunch and dinner
  const lunchMeal = mealsForToday.find((m) => m.mealType === "중식");
  const dinnerMeal = mealsForToday.find((m) => m.mealType === "석식");

  // Filter some allergen summaries
  const allAllergens = Array.from(
    new Set(mealsForToday.flatMap((m) => m.allergens))
  );

  return (
    <div className="screen flex flex-col gap-6 animate-fade-in" id="home-screen-root">
      {/* 1. Large Hero Meal Card */}
      <HeroMealCard 
        dateStr={formattedDate} 
        isWeekend={isWeekend} 
        onFavoriteChange={(liked) => {
          console.log("Favorite changed:", liked);
        }}
      />

      {/* Grid wrapper for responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="home-dashboard-grid">
        {/* Main Columns: Midday & Evening Menus */}
        <div className="lg:col-span-2 flex flex-col gap-6" id="home-menus-panel">
          <div className="flex justify-between items-center" id="home-menus-header">
            <h3 className="font-bold text-lg md:text-xl text-text-dark flex items-center gap-2">
              <Utensils className="w-5 h-5 text-deep-olive" />
              <span>오늘의 급식 식단</span>
            </h3>
            {isWeekend && (
              <span className="text-xs bg-warm-peach text-[#8A3F1F] font-bold px-2 py-0.5 rounded-sm">
                월요일 식단 미리보기
              </span>
            )}
          </div>

          {/* Cards Flex row or column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="home-meals-grid">
            {lunchMeal ? (
              <MealCard meal={lunchMeal} showProteinIndicator={true} />
            ) : (
              <div className="bg-card-white border border-soft-gray p-8 rounded-2xl text-center text-text-dark/50 text-sm">
                해당 날짜의 중식 정보가 아직 없습니다.
              </div>
            )}

            {dinnerMeal ? (
              <MealCard meal={dinnerMeal} showProteinIndicator={true} />
            ) : (
              <div className="bg-card-white border border-soft-gray p-8 rounded-2xl text-center text-text-dark/50 text-sm">
                해당 날짜의 석식 정보가 아직 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* Side Dashboard Column: Nutrition Stats, Quick Calendar Preview, Allergens */}
        <div className="flex flex-col gap-6" id="home-stats-panel">
          {/* A. Dynamic Nutrition Tracker Box */}
          <section className="bg-card-white rounded-2xl p-5 shadow-warm-soft border border-soft-gray flex flex-col gap-3">
            <h4 className="font-bold text-sm text-deep-olive">오늘의 추천 영양 비율</h4>
            <div className="flex justify-between text-xs font-semibold text-text-dark/70">
              <span>일일 칼로리 권장량 (800kcal) 대비 :</span>
              <span className="text-deep-olive font-bold">
                {lunchMeal ? Math.round(((lunchMeal.totalCalories + (dinnerMeal?.totalCalories || 0)) / 1600) * 100) : 0}%
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2.5 mt-1 text-center">
              <div className="bg-soft-gray/30 p-2.5 rounded-xl border border-soft-gray/40">
                <span className="text-[10px] text-text-dark/60 block font-medium">단백질</span>
                <span className="text-sm font-bold text-deep-olive block mt-0.5">
                  {(lunchMeal?.nutrition.protein || 0) + (dinnerMeal?.nutrition.protein || 0)}g
                </span>
              </div>
              <div className="bg-soft-gray/30 p-2.5 rounded-xl border border-soft-gray/40">
                <span className="text-[10px] text-text-dark/60 block font-medium">탄수화물</span>
                <span className="text-sm font-bold text-deep-olive block mt-0.5">
                  {(lunchMeal?.nutrition.carbs || 0) + (dinnerMeal?.nutrition.carbs || 0)}g
                </span>
              </div>
              <div className="bg-soft-gray/30 p-2.5 rounded-xl border border-soft-gray/40">
                <span className="text-[10px] text-text-dark/60 block font-medium">지반</span>
                <span className="text-sm font-bold text-deep-olive block mt-0.5">
                  {(lunchMeal?.nutrition.fat || 0) + (dinnerMeal?.nutrition.fat || 0)}g
                </span>
              </div>
            </div>
          </section>

          {/* B. Weekly quick links */}
          <section className="bg-card-white rounded-xl p-4 shadow-warm-soft border border-soft-gray flex flex-col gap-2.5">
            <div className="flex justify-between items-center border-b border-soft-gray pb-2">
              <h4 className="font-bold text-xs text-text-dark/80 flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4 text-deep-olive" />
                <span>주간 식단 미리보기</span>
              </h4>
              <button 
                onClick={() => onNavigateToTab("식단표")}
                className="text-[11px] font-bold text-deep-olive hover:underline flex items-center"
              >
                <span>이동</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-1.5">
              {allWeekDates.map((dateObj) => {
                const dayName = ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()];
                const formatted = `${dateObj.getMonth() + 1}/${dateObj.getDate()} (${dayName})`;
                const isSelected = dateObj.getDate() === selectedDate.getDate();
                
                return (
                  <div 
                    key={dateObj.toISOString()} 
                    className={`flex justify-between items-center text-xs py-1 px-2 rounded-md ${
                      isSelected ? "bg-sage-green/20 text-deep-olive font-bold border-l-2 border-deep-olive" : "text-text-dark/70"
                    }`}
                  >
                    <span>{formatted}</span>
                    <span className="font-semibold text-[11px]">
                      {allMealsForWeek.find(m => m.dateKey === dateObj.toISOString().slice(0, 10).replace(/-/g, "") && m.mealType === "중식")?.totalCalories || 830} kcal
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* C. Allergy Info box */}
          <section className="bg-card-white rounded-xl p-4 shadow-warm-soft border border-soft-gray flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-warm-peach flex items-center justify-center text-[#8A3F1F] flex-shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-xs text-text-dark/90">오늘의 알레르기 유발 정보</h4>
              <p className="text-xs text-text-dark/70 mt-1 leading-relaxed">
                식단에 포함된 주요 유발 물질은 <span className="font-semibold text-[#8A3F1F]">{allAllergens.join(", ") || "없음"}</span> 입니다. 해당 식품군에 알레르기가 있는 학생은 급식실 배식 전 꼭 영양 교사에게 확인해 주기 바랍니다.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
