"use client";
import { useSearchContext } from "@/app/context/searchcontext";
import { useQuery } from "react-query";
import { HotelType, UserType } from "../../../../../backend/src/shared/types";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
const HotelDeatail = dynamic(() => import("./HotelDeatail"), { ssr: false });

function Booking({ params }: { params: { id: string } }) {
  const search = useSearchContext();
  const [totalnight, settotalnight] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const totalNight =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      settotalnight(Math.ceil(totalNight));
    }
  }, [search.checkIn , search.checkOut]);

  const getcurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`http://localhost:7000/api/users/me`, {
      credentials: "include",
    });

    return response.json();
  };

  const { data: Currentuser } = useQuery("user", getcurrentUser);


  const geaHotel = async (): Promise<HotelType> => {
    const response = await fetch(
      `http://localhost:7000/api/hotels/${params.id}`,
      {
        credentials: "include",
      }
    );
    return response.json();
  };

  const { data: HotelDetail } = useQuery("geaHotel", geaHotel, {
    enabled: !!params.id,
  });

  return (
    <div className=" md:mx-[60px] mx-[20px]  lg:mx-[100px] py-12 pt-8">
      <div className="flex md:flex-row flex-col lg:justify-between  gap-8">
        <div className=" flex-1  h-fit border rounded-md p-4">
          <HotelDeatail
            HoteDetail={HotelDetail}
            checkin={search.checkIn}
            checkOut={search.checkOut}
            adult={search.adultCount}
            child={search.childCount}
            totalnight={totalnight}
          />
        </div>
        <div className="lg:w-[60%]   ">
          <BookingForm name={Currentuser?.firstName} last={Currentuser?.lastName} email={Currentuser?.email} price={HotelDetail?.pricePerNight} totalnight={totalnight} />
        </div>
      </div>
    </div>
  );
}

export default Booking;
