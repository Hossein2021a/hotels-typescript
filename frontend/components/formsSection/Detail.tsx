import { useFormContext } from "react-hook-form";

function Detail() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className=" space-y-4">
      <div className="form__group">
        <input
          className="form__field w-full"
          placeholder="Input text"
          autoComplete="off"
          {...register("name", { required: true, maxLength: 20 })}
        />
        {errors.name && errors.name.type === "required" && (
          <span
            className="
        error"
          >
            This is required
          </span>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <span className="error">Max length exceeded</span>
        )}

        <span className="form__label"> Name: </span>
      </div>

      <div className="flex items-center flex-wrap gap-4">
        <div className="form__group flex-grow">
          <input
            className="form__field w-full"
            placeholder="Input text"
            autoComplete="off"
            {...register("city", { required: true, maxLength: 10 })}
          />
          {errors.city && errors.city.type === "required" && (
            <span
              className="
        error"
            >
              This is required
            </span>
          )}

          <span className="form__label"> City: </span>
        </div>

        <div className="form__group flex-grow">
          <input
            className="form__field w-full"
            placeholder="Input text"
            autoComplete="off"
            {...register("country", { required: true, maxLength: 10 })}
          />
          {errors.country && errors.country.type === "required" && (
            <span
              className="
        error"
            >
              This is required
            </span>
          )}

          <span className="form__label"> Country: </span>
        </div>

        <div className="form__group flex-grow">
          <input
            type="number"
            className="form__field w-full"
            placeholder="Input text"
            autoComplete="off"
            {...register("pricePerNight", { required: true, maxLength: 10 })}
          />
          {errors.pricePerNight && errors.pricePerNight.type === "required" && (
            <span
              className="
        error"
            >
              This is required
            </span>
          )}

          <span className="form__label"> PricePerNight: </span>
        </div>
      </div>

      <div className="form__group">
        <textarea
          rows={7}
          className="form__field w-full"
          placeholder="Input text"
          autoComplete="off"
          {...register("description", { required: true })}
        />
        {errors.description && errors.description.type === "required" && (
          <span
            className="
        error"
          >
            This is required
          </span>
        )}

        <span className="form__label"> description: </span>
      </div>

      <div className="flex items-center flex-wrap gap-4">
        <div className="flex flex-col flex-grow">
          <select
            className="border-[1px]  px-4 text-[14px] rounded-md py-[10px] border-[#58b8d5]"
            {...register("starRating", { required: true })}
          >
            <option value="">Star Rating ...</option>
            {[1, 2, 3, 4, 5].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {errors.starRating && errors.starRating.type === "required" && (
            <span
              className="
        error"
            >
              This is required
            </span>
          )}
        </div>

        <div className="form__group flex-grow">
          <input
            type="number"
            className="form__field w-full"
            placeholder="Input text"
            autoComplete="off"
            {...register("adultCount", { required: true, maxLength: 10 })}
          />
          {errors.adultCount && errors.adultCount.type === "required" && (
            <span
              className="
        error"
            >
              This is required
            </span>
          )}

          <span className="form__label"> AdultCount: </span>
        </div>

        <div className="form__group flex-grow">
          <input
            type="number"
            className="form__field w-full"
            placeholder="Input text"
            autoComplete="off"
            {...register("childCount", { required: true, maxLength: 10 })}
          />
          {errors.childCount && errors.childCount.type === "required" && (
            <span
              className="
        error"
            >
              This is required
            </span>
          )}

          <span className="form__label"> ChildCount: </span>
        </div>
      </div>
    </div>
  );
}

export default Detail;
