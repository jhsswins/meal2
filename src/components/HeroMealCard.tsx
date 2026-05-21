/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Heart, Stars } from "lucide-react";

interface HeroMealCardProps {
  dateStr: string;
  isWeekend: boolean;
  onFavoriteChange?: (liked: boolean) => void;
}

export default function HeroMealCard({ dateStr, isWeekend, onFavoriteChange }: HeroMealCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const toggleLike = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    if (onFavoriteChange) {
      onFavoriteChange(nextState);
    }
  };

  const heroImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCowtOY9ACgUonEk_jg91Yr-eXT0ADV8qoDrd8X3LX5cWN-LVU7C7Hc5eAPWGvzWTYK5u57S3MeMQUSuvQBmq2FFkjBLnWPmPxvWwfiLaxQtxpWNop3natSzYJSkQZdfOjmejg_P51uQOMEbJkgi23u-aQaw4Vi5iv72tWYjNyp3RZ0DF9Sb9SoiMOZX2dLjqMuWzyqcJvhWyAOpgmdPyHJabVPAJZ-bVfbuvm2RHlGZGTnyYvhhFc7-ECbAhE7DHeNZqiPFUDOAC65";

  return (
    <article 
      className="hero-meal-card bg-card-white overflow-hidden rounded-[24px] shadow-warm-deep border border-soft-gray hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
      id="hero-meal-section-card"
    >
      {/* Mobile, Tablet, Desktop Responsive Layout */}
      <div className="flex flex-col md:grid md:grid-cols-12 md:items-stretch" id="hero-grid-layout">
        {/* Left Side: Food Image Area */}
        <div className="relative md:col-span- così md:col-span-5 lg:col-span-6 h-[180px] sm:h-[220px] md:h-auto min-h-[160px] bg-soft-gray overflow-hidden">
          <img
            src={heroImage}
            alt="씨마스고등학교 치즈돈까스 정식 급식 식판 트레이"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            id="hero-tray-image"
          />
          
          {/* Badge: 오늘의 추천 급식 */}
          <div 
            className="absolute top-4 left-4 bg-lime-800/90 text-card-white px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1 backdrop-blur-xs"
            id="today-recommended-badge"
          >
            <Stars className="w-3.5 h-3.5 text-sage-green fill-sage-green" />
            <span>오늘의 추천 급식</span>
          </div>

          {/* Next Meal Day badge if weekend */}
          {isWeekend && (
            <div 
              className="absolute top-4 left-36 bg-[#8A3F1F] text-card-white px-3 py-1 rounded-full text-xs font-bold shadow-md"
              id="next-meal-day-badge"
            >
              다음 급식일
            </div>
          )}

          {/* Favorite heart on overlay (Mobile only, hidden on Desktop right side as required) */}
          <button
            onClick={toggleLike}
            aria-label="오늘의 급식 찜하기"
            id="hero-like-button-overlay"
            className="absolute top-4 right-4 md:hidden w-10 h-10 rounded-full bg-card-white/80 backdrop-blur-sm shadow-md hover:bg-card-white flex items-center justify-center transition-colors active:scale-90 text-error"
          >
            <Heart className={`w-5 h-5 transition-all ${isLiked ? "fill-error text-error" : "text-text-dark/60"}`} />
          </button>
        </div>

        {/* Right Side: Meta and Descriptions */}
        <div className="p-5 md:p-6 md:col-span-7 lg:col-span-6 flex flex-col justify-between" id="hero-meta-section">
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-secondary/90 font-medium text-xs sm:text-sm" id="hero-date-indicator">
                {dateStr}
              </p>
              {/* Desktop Favorite (Hidden on Mobile) */}
              <button
                onClick={toggleLike}
                aria-label="오늘의 급식 찜하기"
                id="hero-like-button-desktop"
                className="hidden md:flex w-9 h-9 rounded-full bg-soft-gray/50 hover:bg-warm-peach/60 hover:text-error items-center justify-center transition-colors active:scale-90"
              >
                <Heart className={`w-5 h-5 transition-all ${isLiked ? "fill-error text-error" : "text-text-dark/60"}`} />
              </button>
            </div>

            <div className="flex items-baseline justify-between gap-2 border-b border-soft-gray/60 pb-3 mb-3">
              <h3 className="font-bold text-xl sm:text-2xl text-deep-olive tracking-tight" id="hero-main-title">
                치즈돈까스 정식
              </h3>
              <span className="font-bold text-lg sm:text-xl text-deep-olive" id="hero-calorie-chip">
                845 kcal
              </span>
            </div>

            <p className="text-sm text-text-dark/80 leading-relaxed" id="hero-dish-description">
              바삭바삭한 국산 치즈 돈까스 위에 감칠맛 나는 데미글라스 소스를 얹고 새콤 상큼한 레몬 갈릭 샐러드와 뜨끈뜨끈한 미역국을 함께 배합하여 최상의 식사 경험을 선사합니다.
            </p>
            
            <div className="mt-4 bg-soft-gray/40 rounded-xl p-3" id="hero-ingredients-summary">
              <h4 className="text-xs font-semibold text-text-dark/80 mb-1">식단 구성</h4>
              <p className="text-xs text-text-dark/70">
                치즈돈까스, 친환경현미밥, 쇠고기미역국, 매콤돈육강정, 숙주미나리무침, 배추김치, 요구르트
              </p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex justify-between items-center text-xs text-text-dark/60" id="hero-dish-footnote">
            <span>※ 알레르기 유발 식품: 대두, 밀, 쇠고기, 돼지고기, 우유</span>
            {isLiked && <span className="text-[#8A3F1F] font-semibold animate-pulse">급식 보관함에 저장됨</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
