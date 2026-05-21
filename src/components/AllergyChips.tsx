/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface AllergyChipsProps {
  allergens: string[];
}

export default function AllergyChips({ allergens }: AllergyChipsProps) {
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-2" id="allergy-chips-container">
      {allergens.map((allergy) => (
        <span
          key={allergy}
          id={`allergy-chip-${allergy}`}
          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-warm-peach text-[#8A3F1F] border border-warm-peach/80 shadow-xs"
        >
          {allergy}
        </span>
      ))}
    </div>
  );
}
