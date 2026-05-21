/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

export default function ToggleSwitch({ checked, onChange, id }: ToggleSwitchProps) {
  return (
    <button
      id={id}
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[24px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? "bg-deep-olive" : "bg-soft-gray"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-card-white shadow-sm ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-[22px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}
