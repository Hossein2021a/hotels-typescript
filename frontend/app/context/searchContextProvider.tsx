"use client";

import React, { useState } from "react";
import { SearchContext } from "./searchcontext";
import { setCookie, getCookie } from "cookies-next";

function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [destination, setdestination] = useState<string>(
    () => getCookie("destination")?.trim() || ''
  );
  const [checkIn, setcheckIn] = useState<Date | undefined>(
    () => new Date(getCookie("checkIn") || new Date())
  );
  const [checkOut, setcheckOut] = useState<Date | undefined>(() => new Date(getCookie("checkOut") || new Date()));
  const [adultCount, setadultCount] = useState<number | undefined>(()=> Number(getCookie("adultCount")) || undefined);
  const [childCount, setchildCount] = useState<number | undefined>(()=> Number(getCookie("childCount")) || undefined);
  const [hotelId, sethotelId] = useState<string>(() => getCookie("hotelId")?.trim() || '');

  const saveSearchValue = (
    destination: string,
    checkIn: Date | undefined,
    checkOut: Date | undefined,
    adultCount: number | undefined,
    childCount: number | undefined,
    hotelId?: string
  ) => {
    setdestination(destination);
    setcheckIn(checkIn);
    setcheckOut(checkOut);
    setadultCount(adultCount);
    setchildCount(childCount);
    if (hotelId) {
      sethotelId(hotelId);
    }
    setCookie("destination", destination);
    setCookie("checkIn", checkIn);
    setCookie("checkOut", checkOut);
    setCookie("adultCount", adultCount);
    setCookie("childCount", childCount);
    setCookie("hotelId", hotelId);
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        saveSearchValue,
        hotelId,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
