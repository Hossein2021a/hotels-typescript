import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  status: "Success" | "Error";
  onClose: () => void;
};

function Toast({ message, status, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    status === "Success"
      ? "fixed z-50 top-[60px] right-6 bg-green-600 text-white w-[250px] py-2 rounded-md px-2"
      : "fixed z-50 top-[50px] right-6 bg-red-600 text-white w-[250px] py-2 rounded-md px-2";

  return (
    <div className={styles}>
      <span>{message}</span>
    </div>
  );
}

export default Toast;
