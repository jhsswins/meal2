/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { Home, CalendarDays, Calculator, User } from "lucide-react";
import { TabType } from "../types";

interface BottomNavProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export default function BottomNav({ currentTab, setCurrentTab }: BottomNavProps) {
  const tabs: { label: TabType; icon: ReactNode }[] = [
    { label: "홈", icon: <Home className="w-5 h-5 mb-0.5" /> },
    { label: "식단표", icon: <CalendarDays className="w-5 h-5 mb-0.5" /> },
    { label: "영양계산", icon: <Calculator className="w-5 h-5 mb-0.5" /> },
    { label: "프로필", icon: <User className="w-5 h-5 mb-0.5" /> },
  ];

  return (
    <nav 
      className="mobile-bottom-nav fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40 md:hidden flex justify-around items-center py-2 px-3 bg-card-white border-t border-soft-gray rounded-t-2xl shadow-warm-soft h-[72px]" 
      id="mobile-bottom-navigation-bar"
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.label;
        return (
          <button
            key={tab.label}
            onClick={() => setCurrentTab(tab.label)}
            id={`mobile-tab-${tab.label}`}
            className={`flex flex-col items-center justify-center transition-all duration-200 ${
              isActive
                ? "bg-deep-olive text-card-white shadow-sm rounded-full px-[18px] py-2 scale-105"
                : "text-text-dark/70 hover:text-deep-olive hover:bg-soft-gray/40 rounded-xl px-3 py-1.5 active:scale-95"
            }`}
          >
            {tab.icon}
            <span className={`text-[11px] font-medium leading-none ${isActive ? "mt-0.5" : "mt-1"}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
