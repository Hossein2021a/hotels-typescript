"use client";

import { DatePicker, Form, Input } from "antd";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import type { GetProps } from "antd";
import { useSearchContext } from "@/app/context/searchcontext";
import Link from "next/link";

const { RangePicker } = DatePicker;

function Date() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const search = useSearchContext();

  const onFinish = (fieldsValue: any) => {
    const rangeValue = fieldsValue["range-picker"];

    search.saveSearchValue(
      fieldsValue.destination,
      rangeValue[0].$d,
      rangeValue[1].$d,
      fieldsValue.adultCount,
      fieldsValue.childCount
    );
    queryClient.removeQueries("hotels");
    router.push("/search");
  };

  const rangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Please select Date!",
      },
    ],
  };
  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
  const disabledDate: RangePickerProps["disabledDate"] = (current: any) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <div className="border-[1px]  lg:px-10 px-4 pt-8 pb-2 rounded-md ">
      <Form
        name="time_related_controls"
        onFinish={onFinish}
        className="grid lg:grid-cols-7 md:grid-cols-4 gap-2 lg:gap-4 w-full "
      >
        <Form.Item
          name="destination"
          className="col-span-2"
          rules={[{ required: true, message: "Please input!" }]}
          initialValue={search.destination}
        >
          <Input placeholder="destination :  Dubai" />
        </Form.Item>
        <Form.Item
          className="col-span-2"
          name="range-picker"
          {...rangeConfig}
          initialValue={[dayjs(search.checkIn), dayjs(search.checkOut)]}
        >
          <RangePicker
            onCalendarChange={(value) => console.log(value)}
            className=""
            disabledDate={disabledDate}
          />
        </Form.Item>
        <Form.Item
          initialValue={search.adultCount}
          name="adultCount"
          rules={[{ required: true, message: "Please input!" }]}
          className=""
        >
          <Input placeholder="Adult..." type="number" />
        </Form.Item>
        <Form.Item
          name="childCount"
          rules={[{ required: true, message: "Please input!" }]}
          initialValue={search.childCount}
          className=""
        >
          <Input type="number" placeholder="Child..." />
        </Form.Item>

        <Form.Item className="w-full">
          <Button className="w-full" type="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Date;
