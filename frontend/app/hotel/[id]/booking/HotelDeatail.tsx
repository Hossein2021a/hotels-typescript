import { useSearchContext } from "@/app/context/searchcontext";
import { HotelType } from "../../../../../backend/src/shared/types";

type Prop = {
  HoteDetail?: HotelType;
  checkin?: Date;
  checkOut?: Date;
  adult?: number;
  child?: number;
  totalnight?: number;
};

function HotelDeatail({
  HoteDetail,
  checkin,
  checkOut,
  adult,
  child,
  totalnight,
}: Prop) {
  const search = useSearchContext();
  return (
    <div className="text-[16px]">
      <h2 className=" font-semibold text-[20px]">Your Booking details</h2>
      <div className="py-4 border-b-[1px]">
        <span>location : </span>
        <span className="text-[14px]">
          {HoteDetail?.name + "," + HoteDetail?.city}
        </span>
      </div>

      <div className="py-4 border-b-[1px]">
        <div className="flex items-center gap-4 justify-between ">
          <div>
            <div className="text-[15px]">Checkin : </div>
            <div className="text-[14px]">{checkin?.toDateString()}</div>
          </div>
          <div>
            <div className="text-[15px]">CheckOut : </div>
            <div className="text-[14px]">{checkOut?.toDateString()}</div>
          </div>
        </div>
      </div>

      <div className="py-4 border-b-[1px]">
        <span>TotalDay : </span>
        <span className="text-[14px]">{totalnight} days</span>
      </div>

      <div className="pt-2">
        <span>Gusts : </span>
        <span className="text-[14px]">
          {adult} adults + {child} child
        </span>
      </div>
    </div>
  );
}

export default HotelDeatail;
