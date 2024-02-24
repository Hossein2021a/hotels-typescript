import { useFormContext } from "react-hook-form";
import { InputsProps } from "./Addhotelss";

function HotelImage() {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext<InputsProps>();

  const existImage = watch("imageUrls");

  const deleteImage = (e :React.MouseEvent<HTMLSpanElement, MouseEvent> , imageUrl : string) => {

    e.preventDefault()
    setValue("imageUrls" , existImage.filter((url) => url !== imageUrl ))

  };

  return (
    <div className="mt-8">
      <h1 className="mb-2">Picture</h1>
      <input
        {...register("imageFiles", {
          validate: (imageFiles) => {
            const imageLength = imageFiles.length + (existImage?.length || 0);

            if (imageLength === 0) {
              return "image is require";
            }
            if (imageLength > 3) {
              return "image cannot be more than 3";
            }
            return true;
          },
        })}
        id="picture"
        type="file"
        multiple
        accept="image/*"
        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
      />

      {existImage && (
        <div className=" flex  items-center gap-3 w-full mt-8">
          {existImage.map((url) => (
            <div key={url} className="z-0 relative group">
              <img
                className="size-[150px] rounded-md object-cover  "
                src={url}
              />
              <span
                onClick={(e) => deleteImage(e , url)}
                className="absolute inset-0 cursor-pointer text-white flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
              >
                Delete
              </span>
            </div>
          ))}
        </div>
      )}

      {errors.facilities && (
        <span
          className="
        error"
        >
          {errors.imageFiles?.message}{" "}
        </span>
      )}
    </div>
  );
}

export default HotelImage;
