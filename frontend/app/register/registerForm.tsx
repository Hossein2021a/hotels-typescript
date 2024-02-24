"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useMutation } from "react-query";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/appContext";
import Toast from "@/components/Toast";
import { useQueryClient } from "react-query";



const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "FirstName must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "LastName must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "password must be at least 6 characters",
    }),
    repeatPassword: z.string().min(6, {
      message: "password must be at least 6 characters.",
    }),
    email: z
      .string()
      .min(1, {
        message: "email is empty",
      })
      .email({
        message: "email is not correct",
      }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

 function RegisterForm() {

  const {showToast} = useAppContext()
  const queryclient = useQueryClient()



  const router = useRouter()
  const postData = async (formData: z.infer<typeof formSchema>) => {
    const response = await fetch("http://localhost:7000/api/users/register", {
      method: "POST",
      credentials :"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responsebody = await response.json();

    if(!response.ok){
      throw new Error(responsebody.message)
    }
  };
  const query = useMutation(postData , {
    onSuccess : () => {
      showToast({message : "Success" , status:"Success"})
      router.push("/")
      queryclient.invalidateQueries("validateToken")

    },
    onError : (err : Error) => {
      showToast({message : err.message , status:"Error"})
    }

  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    query.mutate(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      repeatPassword: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className=" w-full grid md:grid-cols-2 gap-4 ">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FirstName</FormLabel>
                <FormControl>
                  <Input placeholder="FirstName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LastName</FormLabel>
                <FormControl>
                  <Input placeholder="LastName" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className=" w-full grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RepeatPassword</FormLabel>
                <FormControl>
                  <Input placeholder="repeatPassword" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className=" w-full grid grid-cols-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={query.isLoading} type="submit">Submit {query.isLoading && <Spinner /> }</Button>
      </form>
    </Form>
  );
}

export default RegisterForm
