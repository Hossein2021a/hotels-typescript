import { GiModernCity } from "react-icons/gi";
import { LuHotel } from "react-icons/lu";
import { CiMoneyBill } from "react-icons/ci";

import { IoIosMan } from "react-icons/io";
import { FaChild } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type SingleHotel = {
  city: string;
  country: string;
  type: string;
  price: number;
  adult: number;
  child: number;
  rating: number;
  name:string
  id:string
};

function SingleHotel({
  city,
  country,
  type,
  price,
  adult,
  child,
  rating,
  name,
  id
}: SingleHotel) {
  return (
    <div className=" border-[1px] border-gray-300 rounded-md p-4 my-4">
      <div className=" flex flex-col gap-4 ">
        <div>
          <h2 className=" font-semibold text-[20px] text-gray-500">{name}</h2>
        </div>

        <div>
          <ul className="flex  flex-wrap flex-shrink-0  items-center   gap-2 text-[14px]">
            <li className="border-[1px] p-2 px-4 flex-grow flex-shrink-0  border-gray-200 rounded-md flex items-center gap-1 r">
              <GiModernCity />
              <span className="text-[12px]">{city}</span>
              <span>,</span>
              <span className="text-[12px]">{country}</span>
            </li>
            <li className="border-[1px] flex-grow flex-shrink-0  p-2 px-4 border-gray-200 rounded-md flex items-center gap-1">
              <LuHotel />
              <span>{type}</span>
            </li>
            <li className="border-[1px] flex-grow p-2 flex-shrink-0 px-4 border-gray-200 rounded-md flex items-center gap-1">
              <CiMoneyBill className="text-[18px]" />
              <span className="text-[14px] flex-shrink-0">{price}$ per night</span>
            </li>
            <li className="border-[1px] flex-grow flex-shrink-0 p-2 px-4 border-gray-200 rounded-md flex items-center gap-1">
              <IoIosMan className="text-[18px] flex-shrink-0" />
              <span className="flex-shrink-0">{adult} adult</span>
              <span className="flex-shrink-0">,</span>
              <FaChild className="flex-shrink-0" />
              <span className="flex-shrink-0">{child} child</span>
            </li>
            <li className="border-[1px] flex-grow flex-shrink-0 p-2 px-4  border-gray-200 rounded-md flex items-center gap-1">
              <FaRegStar className="text-[18px] flex-shrink-0" />
              <span className="flex-shrink-0">{rating} star rating</span>
            </li>
          </ul>
        </div>

        <Link className=" flex items-end justify-end" href={`/hote-edit/${id}`}>
          <Button>View Detail</Button>
        </Link>
      </div>
    </div>
  );
}

export default SingleHotel;
