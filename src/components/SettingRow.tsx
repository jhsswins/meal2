/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronRight } from "lucide-react";

interface SettingRowProps {
  title: string;
  onClick: () => void;
  id: string;
}

export default function SettingRow({ title, onClick, id }: SettingRowProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-card-white hover:bg-soft-gray/30 transition-colors active:bg-soft-gray/50 text-left cursor-pointer border-b border-soft-gray last:border-b-0"
    >
      <span className="font-semibold text-sm sm:text-base text-text-dark">
        {title}
      </span>
      <ChevronRight className="w-5 h-5 text-text-dark/40" />
    </button>
  );
}
