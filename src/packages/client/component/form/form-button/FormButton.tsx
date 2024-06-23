"use client";
import Link from "next/link";
import { FC, useState } from "react";

type FormButtonProps = {
  type: "submit" | "button";
  label: string;
  disabled?: boolean;
  link?: string;
};

const FormButton: FC<FormButtonProps> = ({ label, type, disabled, link }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleOnClick = () => {
    setIsClicked(true);
  };

  const handleMouseLeave = () => {
    setIsClicked(false);
  };

  if (link) {
    return (
      <Link href={link} className="w-full">
        <button
          type={type}
          className={`w-full h-full max-h-10 hover:shadow-custom-green 
          font-vt323 text-lg md:text-xl lg:text-2xl text-brand-purple scale-y-110
          ${
            isClicked ? "bg-brand-green" : "bg-brand-white"
          } bg-opacity-90 border border-brand-white 
          rounded-md lg:rounded-lg py-0 md:py-1 px-2 md:px-3 lg:px-4 mt-1 md:mt-3 lg:mt-5`}
        >
          {label}
        </button>
      </Link>
    );
  }
  // Form submit button
  return (
    <button
      type={type}
      className={`w-full h-full hover:shadow-custom-green 
      font-vt323 text-lg md:text-xl lg:text-2xl text-brand-purple scale-y-110
      ${
        isClicked ? "bg-brand-green" : "bg-brand-white"
      } bg-opacity-90 border border-brand-white 
      rounded-md lg:rounded-lg py-0 md:py-1 px-2 md:px-3 lg:px-4`}
      onClick={handleOnClick}
      onMouseLeave={handleMouseLeave}
      aria-disabled={disabled}
    >
      {label}
    </button>
  );
};

export default FormButton;
