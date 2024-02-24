import React from "react";
import Addhotelss from "../../components/formsSection/Addhotelss";

function AddHotel() {
  return (
    <div className="md:mx-[60px] mx-[20px] lg:mx-[180px] py-8 ">
      {<Addhotelss _id={""} userId={""} name={""} city={""} country={""} description={""} type={""} adultCount={0} childCount={0} facilities={[]} pricePerNight={0} starRating={0} imageUrls={[]} lastUpdated={new Date()} bookings={[]} />}
      
   
    </div>
  );
}

export default AddHotel;
