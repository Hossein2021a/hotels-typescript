import React from "react";
import Image from "next/image";

function Footer() {
  const footerpic = [
    { id: 1, url: "/1.webp" },
    { id: 2, url: "/2.webp" },
    { id: 3, url: "/3.webp" },
    { id: 4, url: "/4.webp" },
    { id: 5, url: "/5.webp" },
  ];
  return (
    <div className="">
      <div className="bg-[#f8f9fd] py-8 md:px-[60px] px-[20px] lg:px-[100px]">
        <div className="">
          <div>
            <ul className="flex items-center flex-wrap justify-center gap-4">
              {footerpic.map((item) => (
                <li
                  className=" border-[1px] rounded-md w-[100px] h-[100px]   p-5"
                  key={item.id}
                >
                  <Image
                    src={item.url}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100%"
                    className="w-full"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-sm text-[11px] py-4 ">
            What are the features that make an About Us page engaging? Read on
            and be inspired by these 25 awesome
          </div>
        </div>
      </div>
      <div className="bg-[#ebecf2] flex flex-wrap md:flex-nowrap items-center px-[10px] md:px-[60px]  lg:px-[150px] justify-between   py-6">
        <div className="md:text-sm text-[11px]  w-full text-center ">
          What are the features that make an About Us page
        </div>
        <div className="md:text-sm text-[11px] w-full text-center">Copyright ©1401 snapptrip.com</div>
      </div>
      
    </div>
  );
}

export default Footer;
