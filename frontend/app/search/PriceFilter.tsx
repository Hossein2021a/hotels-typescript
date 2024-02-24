import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select";
type Prop = {
    onChange : (value: string) => void 
}

function PriceFilter({onChange} : Prop) {
  return (
    <div>
      <h2 className="mb-2 font-bold text-gray-700" >Price Filter</h2>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a price" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="30">above 30 </SelectItem>
            <SelectItem value="80">above 80</SelectItem>
            <SelectItem value="150">above 150</SelectItem>
            <SelectItem value="350">above 350</SelectItem>
            <SelectItem value="500">above 500</SelectItem>
            <SelectItem value="1000">above 1000</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default PriceFilter;
