"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";

type Prop = {
  name?: string;
  last?: string;
  email?: string;
  price?: number;
  totalnight?: number | 0;
};

function BookingForm({ name, last, email, price, totalnight }: Prop) {
  type Inputs = {
    firstName: string;
    lastName: string;
    email: string;
  };
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <div className="border rounded-md px-8 py-4">
      <h1 className=" font-semibold text-[18px] mb-4">Confirm Hotel Form</h1>

      <form
        className="flex flex-col gap-4 w-full "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full  gap-1 ">
          <span className="text-[13px]">Name :</span>
          <input
            className="border rounded-md flex-1 py-2 px-2 mb-2 "
            placeholder="Name..."
            {...register("firstName")}
            defaultValue={name}
            disabled
          />
          <span className="text-[13px]">LastName :</span>

          <input
            className="border rounded-md flex-1 py-2 px-2 "
            placeholder="lastName..."
            {...register("lastName")}
            defaultValue={last}
            disabled
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <span className="text-[13px]">Email :</span>
          <input
            className="border rounded-md py-2 px-2 "
            placeholder="Email..."
            {...register("email")}
            defaultValue={email}
            disabled
          />
        </div>

        <div className=" bg-blue-100  rounded-md mt-2 py-3 px-2">
          <span>Your Total Price : </span>
          <span>{price && totalnight ? price * totalnight : price} $</span>
        </div>

        <div>
          <span>Payments Detail:</span>
        </div>

        <Button>Book</Button>
      </form>
    </div>
  );
}

export default BookingForm;
