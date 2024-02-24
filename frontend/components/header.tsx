"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAppContext } from "@/app/context/appContext";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Header() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showToast } = useAppContext();
  const [open, setOpen] = useState(false);

  const sendLogout = async () => {
    await fetch("http://localhost:7000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  const query = useMutation(sendLogout, {
    onSuccess: () => {
      router.push("/login");
      showToast({ message: "Logout Success", status: "Success" });
      queryClient.invalidateQueries("validateToken");
    },
  });

  const logout = () => {
    query.mutate();
    setOpen(false);
  };

  const { isLogedIn } = useAppContext();
  return (
    <div className="py-2 border-b lg:border-0 shadow-sm md:px-[60px] px-[20px] lg:px-[100px]">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={0}
            height={0}
            sizes="100%"
            quality={100}
            className="w-[100%]"
            priority
          />
        </Link>

        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden">
              <IoIosMenu className=" border rounded-sm text-[30px] size-8 px-[2px] cursor-pointer" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="flex items-center justify-center mb-4">
                <Image
                  src={"/logo.svg"}
                  alt={"logo"}
                  width={0}
                  height={0}
                  sizes="100%"
                  className="w-[150px]"
                />
              </SheetHeader>
              <div className="flex items-center justify-center  gap-3">
                {isLogedIn ? (
                  <div className="flex flex-col items-center gap-4">
                    <Link href="/login">
                      <Button
                        onClick={() => setOpen(false)}
                        className=" bg-blue-500 hover:bg-blue-600 py-1 "
                      >
                        my-booking
                      </Button>
                    </Link>
                    <Link href="/my-hotels">
                      <Button
                        onClick={() => setOpen(false)}
                        className=" bg-blue-500 hover:bg-blue-600 py-1"
                      >
                        my-hotels
                      </Button>
                    </Link>
                    <div>
                      <Button
                        onClick={logout}
                        className=" bg-blue-500 hover:bg-blue-600 py-1"
                      >
                        Sign-out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link href="/login">
                      <Button
                        onClick={() => setOpen(false)}
                        className=" bg-blue-500 hover:bg-blue-600 py-1"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button
                        onClick={() => setOpen(false)}
                        className=" bg-blue-500 hover:bg-blue-600 py-1"
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          {isLogedIn ? (
            <div className="md:flex gap-2 hidden">
              <Link href="/login">
                <Button className=" bg-blue-500 hover:bg-blue-600 py-1">
                  my-booking
                </Button>
              </Link>
              <Link href="/my-hotels">
                <Button className=" bg-blue-500 hover:bg-blue-600 py-1">
                  my-hotels
                </Button>
              </Link>
              <div>
                <Button
                  onClick={logout}
                  className=" bg-blue-500 hover:bg-blue-600 py-1"
                >
                  Sign-out
                </Button>
              </div>
            </div>
          ) : (
            <div className="md:flex gap-2 hidden">
              <Link href="/login">
                <Button className=" bg-blue-500 hover:bg-blue-600 py-1">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className=" bg-blue-500 hover:bg-blue-600 py-1">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
