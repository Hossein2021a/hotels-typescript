"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useMutation, useQueryClient } from "react-query";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/appContext";

const formSchema = z.object({
  email: z.string().email({
    message: "email is not valid",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters",
  }),
});

function LoginForm() {
  const { showToast } = useAppContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const postLogindata = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const body = await response.json()

    if (!response.ok) {
      throw new Error(body.message);
    }

    return body;
  };
  const query = useMutation(postLogindata, {
    onSuccess: () => {
      showToast({ message: "Success", status: "Success" });
      router.push("/");
      queryClient.invalidateQueries("validateToken");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, status: "Error" });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    query.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-16">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email..." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={query.isLoading} type="submit">
          Submit
          {query.isLoading && (
            <div className="pl-2">
              <Spinner />
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
