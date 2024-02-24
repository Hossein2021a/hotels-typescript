import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "@/app/config/config";
import { ScrollArea } from "@/components/ui/scroll-area"


function HotelFacilities() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex-1 ">
        <h1 className="mb-4 bg-green-100 text-gray-700 text-[14px] px-2 py-1 rounded-md">Hotel Ficility : </h1>
        <ScrollArea className="h-[180px] ">
            <div className="space-y-4">
            {hotelFacilities.map((item) => (
        <label key={item} className="cyberpunk-checkbox-label">
          <input
          
            value={item}
            type="checkbox"
            className="cyberpunk-checkbox"
            {...register("facilities", {
              validate: (facilities) => {
                if (facilities && facilities.length > 0) {
                  return true;
                } else {
                  return "Atleast on faclity is require";
                }
              },
            })}
          />
          {item}
        </label>
      ))}
            </div>
    

        </ScrollArea> 

      {errors.facilities && (
        <span
          className="
        error"
        >
          this item is require
        </span>
      )}
    </div>
  );
}

export default HotelFacilities;
