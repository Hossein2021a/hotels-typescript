import React from "react";
import { hotelTypes } from "../config/config";

type Prop = {
  selectedType: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function TypeFilter({ selectedType, onChange }: Prop) {
  return (
    <>
      <h2 className="font-bold text-gray-700">Types Property</h2>
      <div className="max-h-[250px] overflow-auto">
        {hotelTypes.map((item) => (
          <div className="flex items-center gap-2 mb-2" key={item}>
            <input
              value={item}
              type="checkbox"
              className="cyberpunk-checkbox"
              checked={selectedType.includes(item)}
              onChange={onChange}
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default TypeFilter;
