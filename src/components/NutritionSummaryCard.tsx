/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface NutritionSummaryCardProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function NutritionSummaryCard({ calories, protein, carbs, fat }: NutritionSummaryCardProps) {
  // Standard target markers for High School Cafeteria Lunch
  const targetCalories = 800;
  const targetProtein = 55;
  const targetCarbs = 130;
  const targetFat = 30;

  const caloryRate = Math.round((calories / targetCalories) * 100);
  const proteinRate = Math.min(100, Math.round((protein / targetProtein) * 100));
  const carbsRate = Math.min(100, Math.round((carbs / targetCarbs) * 100));
  const fatRate = Math.min(100, Math.round((fat / targetFat) * 100));

  return (
    <section 
      className="nutrition-card bg-card-white rounded-2xl p-5 shadow-warm-deep border border-soft-gray flex flex-col gap-4"
      id="nutrition-summary-card-panel"
    >
      <div id="nutrition-summary-header">
        <h3 className="font-bold text-lg text-deep-olive" id="summary-panel-title">
          오늘의 선택 영양
        </h3>
        <p className="text-xs text-text-dark/60 mt-0.5" id="summary-panel-desc">
          선택한 급식 메뉴 조합의 실시간 총 영양성분입니다.
        </p>
      </div>

      <div className="flex items-baseline justify-between border-b border-soft-gray pb-3.5" id="summary-calorie-row">
        <span className="font-bold text-2xl lg:text-3xl text-text-dark tracking-tight" id="summary-total-calc">
          {calories} kcal
        </span>
        <span className="text-xs font-semibold text-text-dark/70" id="summary-calorie-percentage">
          권장량 {targetCalories}kcal 대비 {caloryRate}%
        </span>
      </div>

      {/* Progress Bars for Macro Nutrients */}
      <div className="flex flex-col gap-3.5" id="summary-nutrients-list">
        {/* Protein (단백질) */}
        <div className="flex flex-col gap-1" id="nutrient-row-protein">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-text-dark/70">단백질</span>
            <span className="text-deep-olive font-bold">{protein}g <span className="text-text-dark/50 text-[10px] font-normal">/ {targetProtein}g</span></span>
          </div>
          <div className="w-full bg-soft-gray h-2 rounded-full overflow-hidden">
            <div 
              className="bg-deep-olive h-2 rounded-full transition-all duration-300"
              style={{ width: `${proteinRate}%` }}
              id="progress-protein"
            ></div>
          </div>
        </div>

        {/* Carbs (탄수화물) */}
        <div className="flex flex-col gap-1" id="nutrient-row-carbs">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-text-dark/70">탄수화물</span>
            <span className="text-deep-olive font-bold">{carbs}g <span className="text-text-dark/50 text-[10px] font-normal">/ {targetCarbs}g</span></span>
          </div>
          <div className="w-full bg-soft-gray h-2 rounded-full overflow-hidden">
            <div 
              className="bg-deep-olive h-2 rounded-full transition-all duration-300"
              style={{ width: `${carbsRate}%` }}
              id="progress-carbs"
            ></div>
          </div>
        </div>

        {/* Fat (지방) */}
        <div className="flex flex-col gap-1" id="nutrient-row-fat">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-text-dark/70">지방</span>
            <span className="text-deep-olive font-bold">{fat}g <span className="text-text-dark/50 text-[10px] font-normal">/ {targetFat}g</span></span>
          </div>
          <div className="w-full bg-soft-gray h-2 rounded-full overflow-hidden">
            <div 
              className="bg-deep-olive h-2 rounded-full transition-all duration-300"
              style={{ width: `${fatRate}%` }}
              id="progress-fat"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
