/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Returns a Date object adjusted to KST (Asia/Seoul).
 * This ensures consistency even if the client's local system is in a different timezone.
 */
export function getTodayKST(): Date {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const kstOffset = 9 * 60 * 60000;
  return new Date(utc + kstOffset);
}

/**
 * Formats a Date object as "M월 D일 E요일" (e.g., "10월 24일 목요일")
 */
export function formatKoreanDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayName = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  return `${month}월 ${day}일 ${dayName}요일`;
}

/**
 * Formats a Date object to "YYYYMMDD" layout for standard query keys
 */
export function formatDateKey(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

/**
 * Returns an array of 5 Date objects representing Monday to Friday of the week containing baseDate
 */
export function getWeekDates(baseDate: Date): Date[] {
  const currentDay = baseDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  // Monday offset calculation:
  // If Sunday (0), Monday is tomorrow (+1) or we look at the previous Monday (-6 offset depending on interpretation)
  // Let's make Sunday map to the following Monday, and Saturday to the previous Monday, or general calendar logic:
  // Offset to Monday:
  const offsetToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() + offsetToMonday);
  
  const dates: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const nextDate = new Date(monday);
    nextDate.setDate(monday.getDate() + i);
    dates.push(nextDate);
  }
  return dates;
}

/**
 * Calculates current month and week number from a date, formatting as "M월 N주차"
 */
export function getWeekOfMonth(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  
  // Find the first day of the month
  const firstDay = new Date(year, date.getMonth(), 1);
  const firstDayOfWeek = firstDay.getDay(); // Sunday=0, Monday=1, etc.
  
  // Calculate day of month
  const dayOfMonth = date.getDate();
  
  // We can calculate the week index based on dayOfMonth + offset of first day
  const weekNum = Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
  
  return `${month}월 ${weekNum}주차`;
}

/**
 * Selects today if it is a weekday (Mon-Fri).
 * If today is a weekend (Sat, Sun), returns the next Monday and flags weekend adjustment.
 */
export function getDefaultSelectedDate(): { date: Date; isWeekendAdjustment: boolean } {
  const today = getTodayKST();
  const day = today.getDay(); // 0 is Sunday, 6 is Saturday
  
  if (day === 0) { // Sunday
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 1);
    return { date: nextMonday, isWeekendAdjustment: true };
  } else if (day === 6) { // Saturday
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 2);
    return { date: nextMonday, isWeekendAdjustment: true };
  }
  
  return { date: today, isWeekendAdjustment: false };
}

/**
 * Cleans original NEIS raw meal strings by stripping special symbols, allergy code digits,
 * brackets, and extraneous spaces as requested.
 */
export function cleanDishName(name: string): string {
  if (!name) return "";
  
  let cleaned = name;
  
  // 1. Remove HTML br tags
  cleaned = cleaned.replace(/<br\s*\/?>/gi, " ");
  
  // 2. Remove standard allergy codes like (*1.2.3.4.) or (5.6.10)
  cleaned = cleaned.replace(/\([0-9\.]+\)/g, "");
  
  // 3. Remove codes trailing menu items (like "돈육김치찌개5.6.10." -> matching "5.6.10." or "5.")
  cleaned = cleaned.replace(/\d+(?:\.\d+)*\./g, "");
  
  // 4. Remove floating asterisks or bullets
  cleaned = cleaned.replace(/[\*\-\[\]\{\}\|\\\/]/g, "");
  cleaned = cleaned.replace(/[·ㆍ\.]/g, "");
  
  // 5. Remove any leftover trailing numbers attached at the end
  cleaned = cleaned.replace(/\s+\d+\s*$/, "");
  
  // 6. Clean up white spaces
  cleaned = cleaned.trim().replace(/\s+/g, " ");
  
  return cleaned;
}
