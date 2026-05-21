/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MealData, NutritionMenuItem } from "./types";
import { formatDateKey, formatKoreanDate } from "./utils";

/**
 * Dynamically generates 5 days of school meal data for the given week dates.
 * Always makes sure schoolName is exactly "씨마스고등학교".
 */
export function generateWeeklyMockData(weekDates: Date[]): MealData[] {
  const result: MealData[] = [];
  
  // Day names for matching
  const dayNames: ("월" | "화" | "수" | "목" | "금")[] = ["월", "화", "수", "목", "금"];
  
  weekDates.forEach((date, index) => {
    const dKey = formatDateKey(date);
    const dayOfWeek = dayNames[index] || "월";
    const dateStr = formatKoreanDate(date);
    
    // Create Lunch and Dinner for each weekday
    if (dayOfWeek === "월") {
      result.push({
        id: `${dKey}_lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "중식",
        title: "새콤달콤 안동찜닭 정식",
        dishes: ["친환경현미밥", "시원한꽃게탕", "안동찜닭", "실곤약야채무침", "석박지", "골드키위"],
        totalCalories: 810,
        nutrition: { protein: 28, carbs: 120, fat: 18 },
        allergens: ["대두", "밀", "닭고기", "토마토"]
      });
      result.push({
        id: `${dKey}_dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "석식",
        title: "얼큰동태국과 떡볶이",
        dishes: ["김가루주먹밥", "얼큰동태국", "매콤떡볶이", "김말이튀김", "배추김치", "사과주스"],
        totalCalories: 740,
        nutrition: { protein: 18, carbs: 115, fat: 22 },
        allergens: ["대두", "밀", "토마토"]
      });
    } else if (dayOfWeek === "화") {
      result.push({
        id: `${dKey}_lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "중식",
        title: "오리훈제 특선",
        dishes: ["기장밥", "맑은순두부찌개", "오리훈제구이", "짜장떡볶이", "무쌈", "배추김치", "방울토마토"],
        totalCalories: 830,
        nutrition: { protein: 30, carbs: 108, fat: 24 },
        allergens: ["대두", "밀", "돼지고기"]
      });
      result.push({
        id: `${dKey}_dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "석식",
        title: "든든 소불고기덮밥",
        dishes: ["소불고기덮밥", "가쓰오장국", "고구마바삭튀김", "락교무침", "깍두기", "시원한식혜"],
        totalCalories: 710,
        nutrition: { protein: 21, carbs: 110, fat: 16 },
        allergens: ["대두", "밀", "쇠고기"]
      });
    } else if (dayOfWeek === "수") {
      result.push({
        id: `${dKey}_lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "중식",
        title: "치즈치킨까스 축제",
        dishes: ["날치알볶음밥", "팽이버섯맑은국", "치즈치킨까스*소스", "푸딩가든샐러드", "나박김치", "아침에포도"],
        totalCalories: 820,
        nutrition: { protein: 26, carbs: 122, fat: 20 },
        allergens: ["난류", "우유", "대두", "밀", "닭고기"]
      });
      result.push({
        id: `${dKey}_dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "석식",
        title: "가쓰오 미니우동 세트",
        dishes: ["가쓰오우동", "참치마요오니기리", "바삭단무지", "배추김치", "오렌지주스"],
        totalCalories: 690,
        nutrition: { protein: 14, carbs: 105, fat: 12 },
        allergens: ["난류", "대두", "밀"]
      });
    } else if (dayOfWeek === "목") {
      // THURSDAY is our showstopper matching the original screenshot!
      result.push({
        id: `${dKey}_lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "중식",
        title: "치즈돈까스 정식",
        dishes: ["친환경현미밥", "쇠고기미역국", "매콤돈육강정", "숙주미나리무침", "배추김치"],
        totalCalories: 845,
        nutrition: { protein: 32, carbs: 110, fat: 25 },
        allergens: ["대두", "밀", "쇠고기", "돼지고기"]
      });
      result.push({
        id: `${dKey}_dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "석식",
        title: "참치마요 소풍",
        dishes: ["참치마요덮밥", "유부장국", "매콤떡볶이", "깍두기", "요구르트"],
        totalCalories: 720,
        nutrition: { protein: 19, carbs: 105, fat: 20 },
        allergens: ["난류", "우유", "대두", "밀"]
      });
    } else if (dayOfWeek === "금") {
      result.push({
        id: `${dKey}_lunch`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "중식",
        title: "제육볶음과 두부구이",
        dishes: ["차조밥", "시원한근대된장국", "제육볶음", "두부구이*양념간장", "배추김치", "액티비아"],
        totalCalories: 790,
        nutrition: { protein: 29, carbs: 102, fat: 22 },
        allergens: ["대두", "밀", "돼지고기"]
      });
      result.push({
        id: `${dKey}_dinner`,
        schoolName: "씨마스고등학교",
        date: dateStr,
        dateKey: dKey,
        dayOfWeek,
        mealType: "석식",
        title: "홍콩풍 짜장면 파티",
        dishes: ["짜장면", "바삭군만두", "새콤치킨무", "노란단무지", "아이스요구르트"],
        totalCalories: 730,
        nutrition: { protein: 20, carbs: 118, fat: 19 },
        allergens: ["난류", "대두", "밀", "돼지고기"]
      });
    }
  });

  return result;
}

/**
 * Default items for the Calculator view
 */
export function generateCalculatorMenuItems(): NutritionMenuItem[] {
  return [
    {
      id: "menu_1",
      name: "현미밥",
      category: "밥류",
      description: "탄수화물 60g",
      calories: 300,
      protein: 6,
      carbs: 60,
      fat: 1,
      allergens: [],
      selected: true
    },
    {
      id: "menu_2",
      name: "돼지고기 김치찌개",
      category: "국/찌개",
      description: "돼지고기 함유",
      calories: 250,
      protein: 18,
      carbs: 12,
      fat: 14,
      allergens: ["돼지고기", "대두", "밀"],
      selected: true
    },
    {
      id: "menu_3",
      name: "시금치 나물",
      category: "반찬",
      description: "식이섬유 3g",
      calories: 45,
      protein: 2,
      carbs: 6,
      fat: 0.5,
      allergens: [],
      selected: false
    },
    {
      id: "menu_4",
      name: "고등어 구이",
      category: "반찬",
      description: "고등어",
      calories: 250,
      protein: 22,
      carbs: 2,
      fat: 16,
      allergens: ["고등어", "대두", "밀"],
      selected: false
    },
    {
      id: "menu_5",
      name: "매콤돈육강정",
      category: "반찬",
      description: "매콤달콤 돼지고기 배합",
      calories: 320,
      protein: 16,
      carbs: 28,
      fat: 15,
      allergens: ["돼지고기", "대두", "밀"],
      selected: false
    },
    {
      id: "menu_6",
      name: "요구르트",
      category: "디저트",
      description: "유산균 발효유",
      calories: 80,
      protein: 1,
      carbs: 18,
      fat: 0.5,
      allergens: ["우유"],
      selected: false
    },
    {
      id: "menu_7",
      name: "골드키위",
      category: "디저트",
      description: "비타민 C 가득",
      calories: 60,
      protein: 1,
      carbs: 15,
      fat: 0.1,
      allergens: [],
      selected: false
    }
  ];
}
