import { useFormContext } from "react-hook-form";
import { hotelTypes } from "@/app/config/config";
import { ScrollArea } from "@/components/ui/scroll-area"

function HotelTypee() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex-1">
      <h1 className="mb-4 bg-green-100 text-gray-700 text-[14px] px-2 py-1 rounded-md">Hotel Type :</h1>
      <ScrollArea className="h-[180px]">

        <div className="radio-button-container flex flex-col items-start justify-start">
        {hotelTypes.map((item , index)=>(
          <div key={item} className="radio-button">
          <input
            type="radio"
            className="radio-button__input"
            id={item+index}
            value={item}
            {...register("type", { required: true})}
          />
          <label className="radio-button__label" htmlFor={item+index}>
            <span className="radio-button__custom"></span>
            {item}
          </label>
          
        </div>
        ))}

        </div>

    
 
      </ScrollArea>
      {errors.type && errors.type.type === "required" && (
          <span
            className="
        error"
          >
            This is required
          </span>
        )}
    </div>
  );
}

export default HotelTypee;
