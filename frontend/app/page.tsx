import Hero from "@/components/hero/hero";
import Date from "@/components/Date";
import { Hotelslider } from "@/components/Hotelslider";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <div className="md:mx-[60px] mx-[20px] lg:mx-[100px]">
        <Date />
      </div>
      <Hotelslider />
    </main>
  );
}
