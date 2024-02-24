"use client";

import * as React from "react";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useQueryClient } from "react-query";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchContext } from "@/app/context/searchcontext";
import { FormEvent, useState } from "react";

export function SearchBar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const search = useSearchContext();
  const router = useRouter();
  const [date, setDate] = useState<any>({
    from: search.checkIn,
    to: search.checkOut,
  });
  const [destination, setdestination] = useState<string>(search.destination);
  const [adultCount, setadultCount] = useState<number | undefined>(search.adultCount);
  const [childCount, setchildCount] = useState<number | undefined>(search.childCount);
  const queryClient = useQueryClient()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValue(
      destination,
      date.from,
      date.to,
      adultCount,
      childCount
    );
    queryClient.removeQueries("hotels");
    router.push("/search");
  };

  const clearForm = () => {
    setdestination("");
    setadultCount(1);
    setchildCount(0);
    setDate({ from: new Date(), to: new Date() });
  };

  return (
    <>
      <form
        className="flex items-center gap-4 border-[1px] border-gray-300 rounded-md shadow-sm py-8 px-4"
        onSubmit={handleSubmit}
      >
        <div>
          <Input
            id="destination"
            onChange={(event) => setdestination(event.target.value)}
            placeholder="destination..."
            value={destination}
            required
          />
        </div>
        <div className={cn("grid gap-2", className)}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <SlCalender className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Input
            type="number"
            id="adultCount"
            onChange={(event) => setadultCount(parseInt(event.target.value))}
            placeholder="adult..."
            value={adultCount}
          />
        </div>

        <div>
          <Input
            type="number"
            id="childCount"
            onChange={(event) => setchildCount(parseInt(event.target.value))}
            placeholder="child..."
            value={childCount}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit">Search</Button>
          <Button
            type="button"
            onClick={() => clearForm()}
            className=" bg-rose-500"
          >
            Clear
          </Button>
        </div>
      </form>
    </>
  );
}
