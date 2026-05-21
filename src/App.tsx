/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TabType, MealData } from "./types";
import { 
  getTodayKST, 
  getWeekDates, 
  getDefaultSelectedDate, 
  formatDateKey 
} from "./utils";
import { generateWeeklyMockData } from "./mockData";

// Components
import AppHeader from "./components/AppHeader";
import BottomNav from "./components/BottomNav";
import HomeScreen from "./components/HomeScreen";
import WeeklyMenuScreen from "./components/WeeklyMenuScreen";
import NutritionCalculatorScreen from "./components/NutritionCalculatorScreen";
import ProfileScreen from "./components/ProfileScreen";
import { AlertCircle, Check } from "lucide-react";

export default function App() {
  // TODO: Add actual Gmarket Sans font files to /public/fonts before deployment.
  // TODO: Use dateKey to request meal data from the NEIS API.
  // TODO: Replace dynamic mock data with real NEIS meal data.
  // TODO: Handle weekends and school holidays from NEIS calendar data.
  // TODO: Prepare GitHub and Vercel deployment.

  // State management
  const [currentTab, setCurrentTab] = useState<TabType>("홈");
  
  // Date configuration
  const [selection, setSelection] = useState(() => getDefaultSelectedDate());
  const { date: selectedDate, isWeekendAdjustment: isWeekend } = selection;

  // Notification notification system
  const [globalNotice, setGlobalNotice] = useState<string | null>(
    "📢 금일 씨마스고등학교 영양 지침에 따라 알레르기 수용 필터 조절을 테스트해 보실 수 있습니다."
  );

  // Compute Monday to Friday of the active week
  const weekDates = useMemo(() => {
    return getWeekDates(selectedDate);
  }, [selectedDate]);

  // Generate mock meals for Monday through Friday of the active week
  const allMealsForActiveWeek = useMemo(() => {
    return generateWeeklyMockData(weekDates);
  }, [weekDates]);

  // Filter meals for the selected date
  const mealsForToday = useMemo(() => {
    const sKey = formatDateKey(selectedDate);
    return allMealsForActiveWeek.filter((m) => m.dateKey === sKey);
  }, [allMealsForActiveWeek, selectedDate]);

  // Date selection change
  const handleDateChange = (newDate: Date) => {
    setSelection({
      date: newDate,
      isWeekendAdjustment: newDate.getDay() === 0 || newDate.getDay() === 6
    });
  };

  // Header notifications click
  const handleNotificationClick = () => {
    setGlobalNotice("🔔 새 급식 소식: 내일 금요일에는 국산 유기농 포도 가득 디저트 컵이 특별 준비됩니다!");
    setTimeout(() => {
      setGlobalNotice(null);
    }, 5000);
  };

  return (
    <div className="app-shell min-h-screen flex flex-col bg-cream-bg">
      {/* 1. Header Toolbar */}
      <AppHeader 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onNotificationClick={handleNotificationClick} 
      />

      {/* 2. Main content container */}
      <main className="app-content flex-grow pt-20 pb-24 md:pb-8 max-w-[1240px] w-full mx-auto px-4 md:px-8">
        <div className="responsive-container">
          
          {/* Global Alert Notification Toast banner */}
          <AnimatePresence>
            {globalNotice && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-5 bg-deep-olive text-card-white px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-md flex items-center justify-between"
                id="global-toast-header-banner"
              >
                <span>{globalNotice}</span>
                <button 
                  onClick={() => setGlobalNotice(null)}
                  className="text-sage-green hover:text-card-white font-bold text-xs ml-3 cursor-pointer"
                  id="close-global-notice"
                >
                  확인
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Router views accompanied by nice flowy animations */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              id={`screen-tab-container-${currentTab}`}
            >
              {currentTab === "홈" && (
                <HomeScreen
                  selectedDate={selectedDate}
                  mealsForToday={mealsForToday}
                  isWeekend={isWeekend}
                  onNavigateToTab={setCurrentTab}
                  allWeekDates={weekDates}
                  allMealsForWeek={allMealsForActiveWeek}
                />
              )}

              {currentTab === "식단표" && (
                <WeeklyMenuScreen
                  dates={weekDates}
                  selectedDate={selectedDate}
                  onSelectDate={handleDateChange}
                  mealsForSelectedDate={mealsForToday}
                  isWeekend={isWeekend}
                />
              )}

              {currentTab === "영양계산" && (
                <NutritionCalculatorScreen />
              )}

              {currentTab === "프로필" && (
                <ProfileScreen />
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>

      {/* 3. Mobile Underlay Sticky Nav */}
      <BottomNav 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
      />
    </div>
  );
}
