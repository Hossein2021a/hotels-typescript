"use client";
import Addhotelss from "@/components/formsSection/Addhotelss";
import { useQuery } from "react-query";

export type ParamsProp = {
  params: { id: string };
};

function EditHotel({ params }: ParamsProp) {
  const getHotel = async () => {
    const response = await fetch(
      `http://localhost:7000/api/my-hotels/${params.id}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Something wrong happend");
    }
    return await response.json();
  };


  const { data, isLoading } = useQuery("SingleHotel", getHotel, {
    enabled: !!params.id,
  });

  return <>{isLoading ? <span>loading...</span> : <Addhotelss  {...data}  />}</>;
}

export default EditHotel;
