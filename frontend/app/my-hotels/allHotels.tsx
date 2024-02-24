"use client";

import React from "react";
import SingleHotel from "./singleHotel";
import { useQuery } from "react-query";
import { HotelType } from "../../../backend/src/shared/types";
import { Skeleton } from "@/components/ui/skeleton";

function AllHotel() {
  const getAllHotel = async () => {
    const response = await fetch("http://localhost:7000/api/my-hotels", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("somethin went Wrong");
    }

    return await response.json();
  };

  const { isLoading, data } = useQuery("GetHotel", getAllHotel);

  return (
    <div>
      {isLoading && Array.from({length:3}).map((item , index)=>(
        <Skeleton key={index} className="w-full h-[150px] my-4" />
      ))}
      {data?.map((item: HotelType) => (
        <SingleHotel
          key={item._id}
          city={item.city}
          country={item.country}
          name={item.name}
          child={item.childCount}
          adult={item.adultCount}
          price={item.pricePerNight}
          type={item.type}
          rating={item.starRating}
          id={item._id}
        />
      ))}
    </div>
  );
}

export default AllHotel;
