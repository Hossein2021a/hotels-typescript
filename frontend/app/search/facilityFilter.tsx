import React from "react";
import { hotelFacilities } from "../config/config";

type Props = {
  selectedFicility: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FacilityFilter({ selectedFicility, onChange }: Props) {
  return (
    <div>
      <h2 className="mb-2 font-bold text-gray-700">Facility Property</h2>

      {hotelFacilities.map((facilirty) => (
        <div className="flex items-center gap-1 mb-2" key={facilirty}>
          <input
            className="cyberpunk-checkbox"
            type="checkbox"
            value={facilirty}
            checked={selectedFicility.includes(facilirty)}
            onChange={onChange}
          />
          <span>{facilirty}</span>
        </div>
      ))}
    </div>
  );
}

export default FacilityFilter;
