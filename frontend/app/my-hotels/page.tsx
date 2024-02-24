
import AllHotel from "./allHotels";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function MyHotelPage() {
  return (
    <div className=" md:mx-[60px] mx-[20px] lg:mx-[100px] py-8">
      <div className="  flex items-center justify-between">
        <h1 className=" font-bold text-[25px] text-gray-800">My Hotels</h1>

        <Link  href="/add-hotel">
        <Button>Add Hotel</Button>
        </Link>
        
      </div>
      <AllHotel />
    </div>
  );
}

export default MyHotelPage;
