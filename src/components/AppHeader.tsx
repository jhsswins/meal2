/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { Utensils, Bell, CalendarDays, Calculator, User, Home } from "lucide-react";
import { TabType } from "../types";

interface AppHeaderProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  onNotificationClick: () => void;
}

export default function AppHeader({ currentTab, setCurrentTab, onNotificationClick }: AppHeaderProps) {
  const tabs: { label: TabType; icon: ReactNode }[] = [
    { label: "홈", icon: <Home className="w-4 h-4 mr-1.5" /> },
    { label: "식단표", icon: <CalendarDays className="w-4 h-4 mr-1.5" /> },
    { label: "영양계산", icon: <Calculator className="w-4 h-4 mr-1.5" /> },
    { label: "프로필", icon: <User className="w-4 h-4 mr-1.5" /> },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-card-white border-b border-soft-gray/60 shadow-sm">
      <div className="max-w-[1240px] mx-auto h-16 px-4 md:px-8 flex justify-between items-center">
        {/* Brand Title (Always same weight, font, and style) */}
        <div 
          onClick={() => setCurrentTab("홈")} 
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 active:scale-95 transition-all text-deep-olive"
          id="header-brand"
        >
          <div className="w-9 h-9 rounded-full bg-sage-green/40 flex items-center justify-center text-deep-olive">
            <Utensils className="w-5 h-5" id="brand-spoon" />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight text-deep-olive" id="brand-title">
            씨마스고등학교 급식
          </span>
        </div>

        {/* Desktop Navigation Link Menu (Hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-1 bg-soft-gray/50 p-1.5 rounded-full" id="desktop-navigation">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setCurrentTab(tab.label)}
                id={`desktop-tab-${tab.label}`}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                  isActive
                    ? "bg-deep-olive text-card-white shadow-md"
                    : "text-text-dark/70 hover:text-text-dark hover:bg-soft-gray/80"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1.5" id="header-right-utilities">
          <button
            onClick={onNotificationClick}
            aria-label="알림"
            id="notification-button"
            className="w-10 h-10 rounded-full hover:bg-soft-gray/80 flex items-center justify-center text-text-dark/80 hover:text-deep-olive transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error" id="unread-dot"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
