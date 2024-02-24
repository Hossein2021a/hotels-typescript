"use client";

import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Detail from "./Detail";
import HotelTypee from "./HotelType";
import HotelFacilities from "./HotelFacilities";
import HotelImage from "./HotelImage";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "react-query";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { HotelType } from "../../../backend/src/shared/types";
import { useEffect } from "react";
import { ParamsProp } from "@/app/hote-edit/[id]/page";

export interface InputsProps {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  adultCount: number;
  childCount: number;
  imageFiles: FileList;
  imageUrls: string[];
}

function Addhotelss(data: HotelType) {
  const { toast } = useToast();
  const formMethods = useForm<InputsProps>();
  const { reset } = formMethods;
  const router = useRouter();

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const postAllData = async (hotelFormData: FormData) => {
    const response = await fetch("http://localhost:7000/api/my-hotels", {
      method: "POST",
      credentials: "include",
      body: hotelFormData,
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return await response.json();
  };

  const query = useMutation(postAllData, {
    onSuccess: () => {
      toast({
        variant: "succese",
        title: "hotel succesfully added",
      });
      router.push("/my-hotels");
    },
    onError: (err: Error) => {
      toast({
        variant: "destructive",
        title: err.message,
      });
    },
  });

  const updateForm = async (hotelFormData: FormData) => {
    const response = await fetch(
      `http://localhost:7000/api/my-hotels/${data._id}`,
      {
        method: "PUT",
        credentials: "include",
        body: hotelFormData,
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return await response.json();
  };

  const updateQuey = useMutation(updateForm, {
    onSuccess: () => {
      toast({
        variant: "succese",
        title: "hotel succesfully updated",
      });
      router.push("/my-hotels");
    },
    onError: (err: Error) => {
      toast({
        variant: "destructive",
        title: err.message,
      });
    },
  });

  const onSubmit: SubmitHandler<InputsProps> = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("description", values.description);
    formData.append("type", values.type);
    formData.append("starRating", values.starRating.toString());
    formData.append("adultCount", values.adultCount.toString());
    formData.append("childCount", values.childCount.toString());
    formData.append("pricePerNight", values.pricePerNight.toString());


    Array.from(values.imageFiles).forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    if (values.imageUrls) {
      values.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    values.facilities.forEach((facility, index) =>
      formData.append(`facilities[${index}]`, facility)
    );

    if (data._id) {
      updateQuey.mutate(formData);
    } else {
      query.mutate(formData);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <h1 className="font-semi-bold text-[25px] text-gray-700 pb-4">
          Add Hotel Form
        </h1>
        <Detail />
        <div className="flex gap-8 mt-4">
          <HotelTypee />
          <HotelFacilities />
        </div>
        <HotelImage />
        <Button
          disabled={query.isLoading || updateQuey.isLoading}
          className="my-8"
          type="submit"
        >
          {data._id ? " Update hotel" : "Add Hotel"}{" "}
          {updateQuey.isLoading && (
            <div className="pl-2">
              <Spinner />
            </div>
          )}
          {query.isLoading && (
            <div className="pl-2">
              <Spinner />
            </div>
          )}
        </Button>
      </form>
    </FormProvider>
  );
}

export default Addhotelss;
