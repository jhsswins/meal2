/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MealData {
  id: string;
  schoolName: "씨마스고등학교";
  date: string;         // e.g. "5월 21일 목요일"
  dateKey: string;      // YYYYMMDD format
  dayOfWeek: "월" | "화" | "수" | "목" | "금";
  mealType: "중식" | "석식";
  title: string;        // e.g. "치즈돈까스 정식"
  dishes: string[];
  totalCalories: number;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens: string[];
}

export interface NutritionMenuItem {
  id: string;
  name: string;
  category: "밥류" | "국/찌개" | "반찬" | "디저트";
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  allergens: string[];
  selected: boolean;
}

export type TabType = "홈" | "식단표" | "영양계산" | "프로필";
