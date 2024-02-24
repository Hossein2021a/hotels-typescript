"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "@/components/spinner";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { hotelFacilities } from "@/app/config/config";
import { hotelTypes } from "@/app/config/config";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { useState , useEffect } from "react";
import { HotelType } from "../../backend/src/shared/types";
import Image from "next/image";

function ManageHoteFormMain({ data }: { data: HotelType }) {
  const [error, setError] = useState("");
  const MAX_FILE_SIZE = 1024 * 1024 * 1;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/png",
  ];
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    city: z.string().min(3, {
      message: "city must be at least 3 characters.",
    }),
    country: z.string().min(3, {
      message: "country must be at least 3 characters.",
    }),
    description: z.string().min(3, {
      message: "description must be at least 3 characters.",
    }),
    type: z.string().min(1, {
      message: "you should pick 1 item",
    }),
    pricePerNight: z.number().min(1, {
      message: "please enter pricePerNight",
    }),
    starRating: z.number().min(1, {
      message: "please enter starRating",
    }),
    facilities: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      }),
    adultCount: z.number().min(1, {
      message: "please enter adultCount",
    }),
    childCount: z.number().min(1, {
      message: "please enter childCount",
    }),
    imageFiles: z.custom((value) => {
      if (!(value instanceof FileList) || value.length === 0) {
        setError("At least one image is required.");
        return;
      } else {
        setError("");
      }
      const filesArray = Array.from(value);
      if (
        filesArray.some((file) => !ACCEPTED_IMAGE_TYPES.includes(file.type))
      ) {
        setError("Only .jpg, .jpeg, and .png formats are supported.");
        return;
      } else {
        setError("");
      }
      if (filesArray.some((file) => file.size > MAX_FILE_SIZE)) {
        setError("Max image size is 5MB.");

        return;
      } else {
        setError("");
      }
      return value;
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      imageFiles: [],
      name: data?.name,
      facilities: ["Parking"],
      city: data?.city,
      country: data?.country,
      description: data?.description,
      type: data?.type,
      pricePerNight: data?.pricePerNight,
      starRating: data?.starRating,
      adultCount: data?.adultCount,
      childCount: data?.childCount,
    },
    
  });



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
    },
    onError: (err: Error) => {
      toast({
        variant: "destructive",
        title: err.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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

    const imageFilesArray = Array.from((values.imageFiles as FileList) || []);
    imageFilesArray.forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    values.facilities.forEach((facility, index) =>
      formData.append(`facilities[${index}]`, facility)
    );
    query.mutate(formData);
  }

  return (
    <Form {...form}>
      <form
        id="dsgds"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input
                  defaultValue={data?.name}
                  placeholder="name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" flex items-center gap-8 w-full ">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>city</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={data?.city}
                    placeholder="city"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>country</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={data?.country}
                    placeholder="country"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pricePerNight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>pricePerNight</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={data?.pricePerNight}
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>description</FormLabel>
              <FormControl>
                <Textarea
                  defaultValue={data?.description}
                  rows={7}
                  placeholder="description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-8  ">

          <FormField
            control={form.control}
            name="starRating"
            render={({ field }) => (
              <FormItem>
              <p>starRating</p>
                <FormControl>
                  <Select
                   onValueChange={(value) => field.onChange(+value)}
                  >
                    <SelectTrigger
                      className="w-[250px]"
                    >
                      <SelectValue placeholder="pick one ..." />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4", "5"].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adultCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>adultCount</FormLabel>
                <FormControl>
                  <Input
                    defaultValue={data?.adultCount}
                    type="number"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="childCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>childCount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue={data?.childCount}
                    type="number"
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between w-full gap-8 ">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <p>Type Of Hotel:</p>
                <div className="max-h-[250px] overflow-y-auto ">
                  <FormControl>
                    <div>
                      <RadioGroup {...field} defaultValue={data?.type}>
                        {hotelTypes.map((item) => (
                          <div
                            key={item}
                            className="flex items-center space-x-3 mb-2"
                          >
                            <RadioGroupItem value={item} id={item} />
                            <Label htmlFor={item}>{item}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </FormControl>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facilities"
            render={() => (
              <FormItem className="flex-1">
                <p>Facilities Of Hotel:</p>

                <div className="max-h-[250px] overflow-y-auto space-y-4">
                  {hotelFacilities.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="facilities"
                      render={({ field }) => (
                        <FormItem key={item}>
                          <FormControl>
                            <Checkbox
                              // checked={data?.facilities.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal mx-3">
                            {item}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageFiles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>imageFiles</FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                  type="file"
                  placeholder="shadcn"
                  multiple
                />
              </FormControl>
              <span className="text-[12px] font-semibold text-red-500">
                {error}
              </span>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          {data?.imageUrls.map((item, index) => (
            <img
              key={index}
              alt="image"
              src={item}
              width={0}
              height={0}
              sizes="100%"
              className="w-[250px]"
            />
          ))}
        </div>

        <Button disabled={query.isLoading} type="submit">
          Submit{" "}
          {query.isLoading && (
            <p className="px-2">
              <Spinner />
            </p>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ManageHoteFormMain;
