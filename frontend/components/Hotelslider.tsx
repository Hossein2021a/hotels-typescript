"use client";
import * as React from "react";
import { useQuery } from "react-query";
import { HotelType } from "../../backend/src/shared/types";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Hotelslider() {
  const getAllHotel = async () => {
    const response = await fetch(`http://localhost:7000/api/hotels`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.json();
  };

  const { data, isLoading } = useQuery("hotelss", getAllHotel);

  return (
    <div className=" py-8">
      <div className="  md:px-[60px] px-[10px] lg:px-[100px]  rounded-md py-4 ">
        <div className=" py-4 flex items-center justify-center font-bold text-[20px] text-gray-600">
          All Hotels
        </div>

        <Carousel className="px-8 lg:px-12">
          <CarouselContent className="">
            {isLoading &&
              Array.from({ length: 3 }).map((item, index) => (
                <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
                  <div key={index} className="">
                    <Skeleton className="h-[150px] mb-2 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-[250px]" />
                      <Skeleton className="h-8 w-[200px]" />
                      <Skeleton className="h-8 w-[200px]" />
                    </div>
                  </div>
                </CarouselItem>
              ))}

            {data?.map((item: HotelType) => (
              <CarouselItem
                className="sm:basis-1/2 lg:basis-1/3"
                key={item._id}
              >
                <div className=" border p-4 ">
                  <div>
                    <Carousel className="w-full max-w-xs">
                      <CarouselContent>
                        {item.imageUrls?.map((item) => (
                          <CarouselItem key={item}>
                            <img
                              className=" rounded-sm h-[200px] w-[350px]"
                              src={item}
                              key={item}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>

                  <div className="text-[13px] ">
                    <div className="py-2">
                      <Link
                        className=" font-semibold"
                        href={`/hotel/${item._id}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className=" pt-2 flex justify-between">
                      <div>city : </div>
                      <div>{item.city}</div>
                    </div>

                    <div className=" pb-2  flex justify-between border-b-[1px]">
                      <div>Facility : </div>
                      <div className=" flex items-center gap-2">
                        {item.facilities.slice(0, 2).map((item) => (
                          <div key={item}>{item}</div>
                        ))}
                      </div>
                    </div>
                    <div className=" py-4 flex justify-between">
                      <div>price per night : </div>
                      <div>{item.pricePerNight} $</div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
