/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { formatDateKey } from "../utils";

interface WeekDateSelectorProps {
  dates: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function WeekDateSelector({ dates, selectedDate, onSelectDate }: WeekDateSelectorProps) {
  const dayNames = ["월", "화", "수", "목", "금"];
  const selectedKey = formatDateKey(selectedDate);
  const todayKey = formatDateKey(new Date());

  return (
    <section 
      className="flex justify-between items-center bg-soft-gray/30 rounded-2xl p-2.5 shadow-xs border border-soft-gray"
      id="week-date-selector-row"
    >
      {dates.map((date, idx) => {
        const dKey = formatDateKey(date);
        const isSelected = dKey === selectedKey;
        const isToday = dKey === todayKey;
        
        return (
          <button
            key={dKey}
            id={`date-button-${dKey}`}
            onClick={() => onSelectDate(date)}
            className={`flex flex-col items-center justify-center min-w-[58px] py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-deep-olive text-card-white shadow-md scale-105"
                : "text-text-dark/80 hover:bg-soft-gray/50 hover:text-deep-olive"
            } relative`}
          >
            {/* Day name (월, 화, 수) */}
            <span className={`text-[11px] font-bold tracking-tight mb-1 ${
              isSelected ? "text-sage-green" : "text-text-dark/60"
            }`}>
              {dayNames[idx]}
            </span>

            {/* Date number (16, 17, 18) */}
            <span className="font-bold text-base tracking-tight leading-none" id={`date-num-${dKey}`}>
              {date.getDate()}
            </span>

            {/* Today indicator pip */}
            {isToday && !isSelected && (
              <span 
                className="absolute bottom-1 w-1 h-1 rounded-full bg-deep-olive"
                id={`today-pip-indicator-${dKey}`}
              ></span>
            )}
          </button>
        );
      })}
    </section>
  );
}
