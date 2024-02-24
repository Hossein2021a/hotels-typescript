"use client";

import { createContext, useContext } from "react";

type ToastMassageProp = {
  message: string;
  status: "Success" | "Error";
};

type AppContext = {
  showToast: (toastMassage: ToastMassageProp) => void;
  isLogedIn : boolean
};

export const AppContext = createContext({} as AppContext);
export const useAppContext = () => {
  return useContext(AppContext);
};
