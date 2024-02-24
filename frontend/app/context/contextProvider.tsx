"use client";
import React, { useState } from "react";
import { AppContext } from "./appContext";
import Toast from "@/components/Toast";
import { useQuery } from "react-query";

type ToastMassageProp = {
  message: string;
  status: "Success" | "Error";
};

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMassageProp | undefined>(undefined);

  const validateUser = async () => {
    const response = await fetch(
      "http://localhost:7000/api/auth/validate-token",
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("user is not valid");
    }
    return response.json();
  };

  const { isError } = useQuery("validateToken", validateUser ,{
    retry :false ,
    refetchOnWindowFocus: false,
    
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMassage) => {
          setToast(toastMassage);
        },
        isLogedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
export default ContextProvider;
