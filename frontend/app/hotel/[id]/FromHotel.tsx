import React from "react";
import { DatePicker, Form, GetProps, Input } from "antd";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/app/context/searchcontext";
import { useAppContext } from "@/app/context/appContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

function FromHotel({ params }: { params: { id: string } }) {
  const router = useRouter();
  const search = useSearchContext();
  const app = useAppContext();
  const { RangePicker } = DatePicker;

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

  const onFinish = (fieldsValue: any) => {
    const rangeValue = fieldsValue["range-picker"];

    search.saveSearchValue(
      "",
      rangeValue[0].$d,
      rangeValue[1].$d,
      fieldsValue.adultCount,
      fieldsValue.childCount,
      params.id
    );
    router.push(`/login?referrer=/hotel/${params.id}`);
  };

  const onBook = (fieldsValue: any) => {
    const rangeValue = fieldsValue["range-picker"];

    search.saveSearchValue(
      search.destination,
      rangeValue[0].$d,
      rangeValue[1].$d,
      fieldsValue.adultCount,
      fieldsValue.childCount,
      params.id
    );
    router.push(`/hotel/${params.id}/booking`);
  };

  return (
    <Form
      name="bookFrorm"
      onFinish={app.isLogedIn ? onBook : onFinish}
      className=" gap-2 flex-1"
    >
      <Form.Item
        className=""
        name="range-picker"
        {...rangeConfig}
        initialValue={[dayjs(search.checkIn), dayjs(search.checkOut)]}
      >
        <RangePicker
          onCalendarChange={(value) => console.log(value)}
          className=" w-full"
          disabledDate={disabledDate}
        />
      </Form.Item>

      <div className="grid grid-cols-2 gap-1">
        <Form.Item
          name="adultCount"
          rules={[{ required: true, message: "Please input!" }]}
          initialValue={search.adultCount}
        >
          <Input type="number" placeholder="Adult..." />
        </Form.Item>

        <Form.Item
          name="childCount"
          rules={[{ required: true, message: "Please input!" }]}
          initialValue={search.childCount}
        >
          <Input type="number" placeholder="Child..." />
        </Form.Item>
      </div>

      {!app.isLogedIn && (
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      )}

      {app.isLogedIn && (
        <Button type="submit" className="w-full">
          Book
        </Button>
      )}

      <div></div>
    </Form>
  );
}

export default FromHotel;
