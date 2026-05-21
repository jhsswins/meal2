/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MealData } from "../types";
import { getWeekOfMonth } from "../utils";
import WeekDateSelector from "./WeekDateSelector";
import MealCard from "./MealCard";
import { CalendarDays, AlertCircle } from "lucide-react";

interface WeeklyMenuScreenProps {
  dates: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  mealsForSelectedDate: MealData[];
  isWeekend: boolean;
}

export default function WeeklyMenuScreen({
  dates,
  selectedDate,
  onSelectDate,
  mealsForSelectedDate,
  isWeekend
}: WeeklyMenuScreenProps) {
  const currentWeekStr = getWeekOfMonth(selectedDate);

  // Filter lunch and dinner
  const lunchMeal = mealsForSelectedDate.find((m) => m.mealType === "중식");
  const dinnerMeal = mealsForSelectedDate.find((m) => m.mealType === "석식");

  return (
    <div className="screen flex flex-col gap-6 animate-fade-in" id="weekly-menu-screen-root">
      {/* Title section with small header tag */}
      <div className="flex flex-col gap-1 border-b border-soft-gray/60 pb-3" id="weekly-header-desc">
        <span className="text-secondary/90 font-bold text-xs sm:text-sm tracking-wide uppercase">
          주간 식단표
        </span>
        <h2 className="font-bold text-xl sm:text-2xl text-deep-olive flex items-center gap-2" id="weekly-main-title">
          <CalendarDays className="w-5 h-5 text-deep-olive" />
          <span>{currentWeekStr}</span>
        </h2>
      </div>

      {/* Monday-Friday Date Bar Selector */}
      <WeekDateSelector 
        dates={dates} 
        selectedDate={selectedDate} 
        onSelectDate={onSelectDate} 
      />

      {/* Weekend alert banner, if adjusted */}
      {isWeekend && (
        <div 
          className="bg-warm-peach/60 border border-warm-peach text-[#8A3F1F] p-4 rounded-xl flex items-start gap-2.5 text-xs sm:text-sm"
          id="weekend-warning-banner"
        >
          <AlertCircle className="w-5 h-5 text-[#8A3F1F] shrink-0" />
          <div>
            <span className="font-bold">주말 알림:</span> 오늘은 급식이 없는 시간대입니다. 가장 유효한 다음 급식일인 <span className="font-bold">월요일 식단</span> 정보로 자동 조정하여 미리 보여 줍니다.
          </div>
        </div>
      )}

      {/* Grid of Menus for selectedDate */}
      <div className="flex flex-col gap-4 text-text-dark" id="weekly-meals-panel">
        <div className="text-xs sm:text-sm font-semibold text-text-dark/60" id="weekly-meals-meta-bar">
          대면 배포 및 알레르기 수치 기준 적용 식단
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="weekly-meals-grid">
          {lunchMeal ? (
            <MealCard meal={lunchMeal} showProteinIndicator={true} />
          ) : (
            <div 
              className="bg-card-white border border-soft-gray p-12 rounded-2xl text-center text-text-dark/50 text-sm flex flex-col items-center justify-center gap-2 min-h-[220px]"
              id="no-lunch-placeholder"
            >
              <AlertCircle className="w-8 h-8 text-text-dark/30" />
              <span>해당 날짜의 중식 정보가 아직 배정되지 않았습니다.</span>
            </div>
          )}

          {dinnerMeal ? (
            <MealCard meal={dinnerMeal} showProteinIndicator={true} />
          ) : (
            <div 
              className="bg-card-white border border-soft-gray p-12 rounded-2xl text-center text-text-dark/50 text-sm flex flex-col items-center justify-center gap-2 min-h-[220px]"
              id="no-dinner-placeholder"
            >
              <AlertCircle className="w-8 h-8 text-text-dark/30" />
              <span>해당 날짜의 석식 정보가 아직 배정되지 않았습니다.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
