import EditHotel from "./editHotel";
export type ParamsProp = {
  params: { id: string };
};

function HotelEdit({ params }: ParamsProp) {
  return (
    <div className="md:mx-[60px] mx-[20px] lg:mx-[180px] py-8 ">
      <EditHotel params={params} />
    </div>
  );
}

export default HotelEdit;
