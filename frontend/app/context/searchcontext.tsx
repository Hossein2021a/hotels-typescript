"use client";

import { createContext, useContext } from "react";

type SearchContext = {
  destination: string;
  checkIn?: Date;
  checkOut?: Date;
  adultCount?: number;
  childCount?: number;
  hotelId: string;
  saveSearchValue: (
    destination: string,
    checkIn?: Date,
    checkOut?: Date,
    adultCount?: number,
    childCount?: number,
    hotelId?: string
  ) => void;
};

export const SearchContext = createContext({} as SearchContext);
export const useSearchContext = () => {
  return useContext(SearchContext);
};
