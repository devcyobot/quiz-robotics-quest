"use client";
import { FC, useState } from "react";

export type FormInputProps = {
  typeInput: string;
  placeHolder: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput: FC<FormInputProps> = (props: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : props.typeInput}
        name={props.name}
        placeholder={props.placeHolder}
        className="py-1 sm:py-2 md:py-4 lg:py-5 px-4 sm:px-6 md:px-8 lg:px-11 
      h-10 sm:h-12 lg:h-16 w-full rounded-lg 
      bg-black bg-opacity-50 
      font-vt323 text-sm sm:text-base md:text-lg lg:text-xl text-white"
        required
        onChange={props.onChange}
      />

      {props.typeInput === "password" && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-2 px-4 flex items-center"
        >
          {showPassword ? (
            <svg
              className="w-5 md:w-8 lg:w-10 h-auto"
              viewBox="0 0 34 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.2728 14.9092H13.7274V13.2728H12.091V6.72734H13.7274V5.09098H20.2728V6.72734H21.9092V13.2728H20.2728M23.5456 19.8182H10.4547V18.1819H7.18193V16.5455H3.9092V14.9092H2.27284V13.2728H0.636475V6.72734H2.27284V5.09098H3.9092V3.45461H7.18193V1.81825H10.4547V0.181885H23.5456V1.81825H26.8183V3.45461H30.091V5.09098H31.7274V6.72734H33.3637V13.2728H31.7274V14.9092H30.091V16.5455H26.8183V18.1819H23.5456M18.6365 11.6364V8.3637H15.3637V11.6364M23.5456 16.5455V14.9092H26.8183V13.2728H28.4547V11.6364H30.091V8.3637H28.4547V6.72734H26.8183V5.09098H23.5456V3.45461H10.4547V5.09098H7.18193V6.72734H5.54557V8.3637H3.9092V11.6364H5.54557V13.2728H7.18193V14.9092H10.4547V16.5455H23.5456Z"
                fill="#F8F8F8"
              />
            </svg>
          ) : (
            <svg
              className="w-5 md:w-8 lg:w-10 h-auto"
              viewBox="0 0 34 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.2728 14.9092H13.7274V13.2728H12.091V6.72734H13.7274V5.09098H20.2728V6.72734H21.9092V13.2728H20.2728M23.5456 19.8182H10.4547V18.1819H7.18193V16.5455H3.9092V14.9092H2.27284V13.2728H0.636475V6.72734H2.27284V5.09098H3.9092V3.45461H7.18193V1.81825H10.4547V0.181885H23.5456V1.81825H26.8183V3.45461H30.091V5.09098H31.7274V6.72734H33.3637V13.2728H31.7274V14.9092H30.091V16.5455H26.8183V18.1819H23.5456M18.6365 11.6364V8.3637H15.3637V11.6364M23.5456 16.5455V14.9092H26.8183V13.2728H28.4547V11.6364H30.091V8.3637H28.4547V6.72734H26.8183V5.09098H23.5456V3.45461H10.4547V5.09098H7.18193V6.72734H5.54557V8.3637H3.9092V11.6364H5.54557V13.2728H7.18193V14.9092H10.4547V16.5455H23.5456Z"
                fill="#F8F8F8"
              />
              <line
                x1="2"
                y1="2"
                x2="32"
                y2="18"
                stroke="#F8F8F8"
                strokeWidth="2"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};
export default FormInput;
