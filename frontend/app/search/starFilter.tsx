import React from "react";

type Prop = {
  selcetedStar: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function StarFilter({ selcetedStar, onChange }: Prop) {
  return (
    <div>
      <h4 className="mb-2 font-bold text-gray-700">Property Rating</h4>

      {["5", "4", "3", "2", "1"].map((item) => (
        <div key={item} className="flex items-center gap-1 mb-2">
          <input
            className="cyberpunk-checkbox"
            type="checkbox"
            value={item}
            checked={selcetedStar.includes(item)}
            onChange={onChange}
          />
          <span>{item} stars</span>
        </div>
      ))}
    </div>
  );
}

export default StarFilter;
