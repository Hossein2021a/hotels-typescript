"use client";
import { useSearchContext } from "../context/searchcontext";
import { useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { HotelType } from "../../../backend/src/shared/types";
import { FaStar } from "react-icons/fa";
import Spinner from "@/components/spinner";
import dynamic from "next/dynamic";
import { CiFilter } from "react-icons/ci";
import { Button } from "../../components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Date = dynamic(() => import("../../components/Date"), {
  ssr: false,
  loading: () => <Skeleton className="  mx-auto w-full h-[100px]"></Skeleton>,
});
const StarFilter = dynamic(() => import("./starFilter"), {
  ssr: false,
  loading: () => <Skeleton className="  mx-auto w-full h-[100px]"></Skeleton>,
});
const FacilityFilter = dynamic(() => import("./facilityFilter"), {
  ssr: false,
  loading: () => <Skeleton className="  mx-auto w-full h-[100px]"></Skeleton>,
});
const TypeFilter = dynamic(() => import("./typeFilter"), {
  ssr: false,
  loading: () => <Skeleton className="  mx-auto w-full h-[100px]"></Skeleton>,
});
const PriceFilter = dynamic(() => import("./PriceFilter"), {
  ssr: false,
  loading: () => <Skeleton className="  mx-auto w-full h-[100px]"></Skeleton>,
});

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function SearchPage() {
  const search = useSearchContext();
  const queryClient = useQueryClient();

  const [page, setpage] = useState<number>(1);
  const [maxprice, setmaxprice] = useState<string>("");
  const [sort, setsort] = useState<string>("");
  const [selcetedStar, setselcetedStar] = useState<string[]>([]);
  const [selcetedfacelities, setselcetedfacelities] = useState<string[]>([]);
  const [selcetedTypes, setselcetedTypes] = useState<string[]>([]);

  const queryParams = new URLSearchParams();
  queryParams.append("destination", search.destination || "");
  queryParams.append(
    "checkIn",
    (search.checkIn && search.checkIn.toISOString()) || ""
  );
  queryParams.append(
    "checkOut",
    (search.checkOut && search.checkOut.toISOString()) || ""
  );
  queryParams.append(
    "adultCount",
    (search.adultCount && search.adultCount.toString()) || ""
  );
  queryParams.append(
    "childCount",
    (search.childCount && search.childCount.toString()) || ""
  );
  queryParams.append("maxPrice", maxprice || "");
  queryParams.append("sortOption", sort || "");
  queryParams.append("page", page?.toString() || "");
  queryParams.append("page", page?.toString() || "");
  selcetedStar?.forEach((star) => queryParams.append("stars", star));
  selcetedfacelities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  selcetedTypes?.forEach((type) => queryParams.append("types", type));

  const getAllHotels = async () => {
    const response = await fetch(
      `http://localhost:7000/api/hotels/search?${queryParams}`
    );
    return response.json();
  };

  const { data, isLoading, isSuccess } = useQuery("hotels", getAllHotels);

  useEffect(() => {
    
    return () => {
      queryClient.removeQueries("hotels");
      window.scrollTo(0, 0)
    };
  }, [page, selcetedStar, selcetedfacelities, selcetedTypes, maxprice, sort]);

  const handleStar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starrating = event.target.value;

    setselcetedStar((prev) =>
      event.target.checked
        ? [...prev, starrating]
        : prev.filter((item) => item !== starrating)
    );
  };

  const facilityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facilities = event.target.value;
    setselcetedfacelities((prev) =>
      event.target.checked
        ? [...prev, facilities]
        : prev.filter((item) => item !== facilities)
    );
  };

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setselcetedTypes((prev) =>
      event.target.checked
        ? [...prev, type]
        : prev.filter((item) => item !== type)
    );
  };

  const pricehandler = (value: string) => {
    setmaxprice(value);
  };

  return (
    <div className="mt-8 md:px-[60px] px-[20px] lg:px-[100px]">
      <div className="pb-8">
        <Date />
      </div>

      <div className="flex  gap-8 ">
        <aside className="border-[1px] h-fit md:flex hidden  border-gray-300 rounded-md  px-8 pt-4 pb-8 text-[14px] flex-col gap-6  basis-[15rem]">
          <PriceFilter onChange={pricehandler} />

          <StarFilter selcetedStar={selcetedStar} onChange={handleStar} />
          <FacilityFilter
            selectedFicility={selcetedfacelities}
            onChange={facilityHandler}
          />
          <TypeFilter selectedType={selcetedTypes} onChange={handleType} />
        </aside>

        <div className="flex flex-col w-full  ">
          <div className="mb-4 flex items-center gap-4">
            <h2 className=" font-semibold md:text-[20px] text-left hidden md:block text-[16px]">
              {data?.pagination.total} Hotels Found
            </h2>
            <Select onValueChange={(value: string) => setsort(value)}>
              <SelectTrigger className="w-fit text-[12px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="text-[12px]">
                  <SelectItem value="starRating">starRating</SelectItem>
                  <SelectItem value="pricePerNightAsc">
                    pricePerNightAsc
                  </SelectItem>
                  <SelectItem value="pricePerNightDesc">
                    pricePerNightDesc
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger>
                <div className=" flex md:hidden items-center  shadow-sm px-4  py-2 rounded-md bg-rose-700 text-white">
                  <span>Filter</span>
                  <span className="ml-2">
                    <CiFilter />
                  </span>
                </div>
              </SheetTrigger>
              <SheetContent className=" overflow-auto">
                <aside className="border-[1px] mt-8 h-fit  border-gray-300 rounded-md flex px-8 pt-4 pb-8 text-[14px] flex-col gap-6  basis-[15rem]">
                  <PriceFilter onChange={pricehandler} />

                  <StarFilter
                    selcetedStar={selcetedStar}
                    onChange={handleStar}
                  />
                  <FacilityFilter
                    selectedFicility={selcetedfacelities}
                    onChange={facilityHandler}
                  />
                  <TypeFilter
                    selectedType={selcetedTypes}
                    onChange={handleType}
                  />
                </aside>
              </SheetContent>
            </Sheet>
          </div>

          <div>
            <div className="flex gap-6 justify-between  ">
          
              <div className=" flex flex-col gap-4 flex-1  ">
              {isLoading && Array.from({length:3}).map((item , index)=>(
                        <Skeleton key={index} className="w-full h-[150px]"></Skeleton>
                      ))}
                <ul className="flex flex-1 flex-col  gap-4">
         
                  {data?.data.map((hotel: HotelType) => (
                    <li
                      className="flex items-center flex-col xl:flex-row  gap-[30px] border-[1px] border-gray-300 rounded-md py-[30px] px-[30px]"
                      key={hotel._id}
                    >
                    
                      <Carousel className="max-w-xs">
                        <CarouselContent>
                          {hotel.imageUrls.map((image, index) => (
                            <CarouselItem key={index}>
                              <img src={image} />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>

                      <div className="flex-1 flex flex-col gap-2">
                        <div className=" flex items-center gap">
                          {Array.from({ length: hotel.starRating }).map(
                            (_, index) => (
                              <FaStar
                                key={index}
                                className="text-yellow-300 text-[15px]"
                              />
                            )
                          )}

                          <div className="ml-2 text-[12px] text-gray-400">
                            <p>{hotel.starRating >= 4 && "lucery"}</p>
                            <p>{hotel.starRating <= 3 && "economy"}</p>
                            <p>{hotel.starRating == 1 && "low level"}</p>
                          </div>
                        </div>

                        <Link
                          href={`/hotel/${hotel._id}`}
                          className="font-bold text-[22px] text-gray-600"
                        >
                          {hotel.name}
                        </Link>

                        <span className="text-[12px]">{hotel.description}</span>

                        <div className="flex gap-4 justify-between w-full">
                          <ul className="md:flex hidden items-end gap-2 w-full ">
                            {hotel.facilities.slice(0, 2).map((item) => (
                              <li
                                key={item}
                                className="bg-gray-300  px-3 rounded-sm text-[10px] py-[2px]"
                              >
                                {item}
                              </li>
                            ))}
                            <div className="text-[10px]">
                              {hotel.facilities.length - 2 !== 0 && (
                                <p>
                                  + {hotel.facilities.length - 2} more items
                                </p>
                              )}
                            </div>
                          </ul>

                          <div className="flex md:flex-col gap-4 justify-between items-center w-full md:w-auto md:items-end  text-[14px] md:gap-1 mt-2">
                            <div className="text-[12px] font-semibold">
                              {hotel.pricePerNight}$ Per Night
                            </div>
                            <Link href={`/hotel/${hotel._id}`}>
                              <Button>View More</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 py-8 justify-center ">
                  {Array.from({
                    length: Math.ceil(data?.pagination.total / 3),
                  }).map((item, index) => (
                    <div
                      onClick={() => setpage(index + 1)}
                      className={` ${
                        page === index + 1
                          ? "bg-gray-800 text-white cursor-pointer border-[1px] rounded-md px-[15px] text-[15px] py-[6px] flex items-center justify-center "
                          : "cursor-pointer border-[1px] rounded-md px-[15px] text-[15px] py-[6px] flex items-center justify-center"
                      } `}
                      key={index}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
