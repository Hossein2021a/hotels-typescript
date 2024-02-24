"use client";
import { useQuery } from "react-query";
import { FaStar } from "react-icons/fa";
import { HotelType } from "../../../../backend/src/shared/types";
import FromHotel from "./FromHotel";

function SingleHotel({ params }: { params: { id: string } }) {
  const getSingleHote = async () => {
    const response = await fetch(
      `http://localhost:7000/api/hotels/${params.id}`
    );
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    return await response.json();
  };

  const { data, isLoading } = useQuery<HotelType>("singleHotel", getSingleHote);

  return (
    <div className="md:mx-[60px] mx-[20px] lg:mx-[100px] py-12">
      {isLoading && <div>Loading</div>}

      <div>
        <div className="flex items-center gap-1">
          {Array.from({ length: data?.starRating || 0 }).map(() => (
            <span key={Math.ceil(Math.random() * 10000)}>
              <FaStar className="text-yellow-300" />
            </span>
          ))}
        </div>

        <h2 className=" font-semibold text-gray-700 text-[25px] py-2">
          {data?.name}
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
          {data?.imageUrls.map((item) => (
            <img
              className="flex-1 h-[250px] w-[350px] lg:w-auto grow rounded-sm shadow-md"
              key={Math.ceil(Math.random() * 10000)}
              src={item}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-8 ">
          {data?.facilities.map((facil, index) => (
            <span
              className="border px-6 py-2 rounded-md"
              key={index}
            >
              {facil}
            </span>
          ))}
        </div>

        <div className=" grid md:grid-cols-2  mt-12 gap-8">
          <div className="text-[16px] leading-6">
            <h2 className="text-[16px] font-semibold py-2">Description</h2>
            <div className=" text-justify">{data?.description}</div>
            
          </div>

          <div className=" bg-blue-200 px-[20px] md:px-[45px] py-8 flex flex-col shadow-md rounded-md ">
            <span className="text-[14px] pb-4 font-semibold">{data?.pricePerNight}$ per night</span>
            <FromHotel params = {params} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleHotel;
