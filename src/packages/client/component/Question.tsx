import { FC, useEffect, useState } from "react";
import Option from "./Option";

type QuestionProps = {
  description: string;
  options: string[];
};
const Question: FC<QuestionProps> = ({ description, options }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      // 2xl
      if (window.matchMedia("(min-width: 1536px)").matches) {
        setDimensions({ width: 130, height: 20 });
      }
      // xl
      else if (window.matchMedia("(min-width: 1280px)").matches) {
        setDimensions({ width: 120, height: 20 });
      }
      // lg
      else if (window.matchMedia("(min-width: 1024px)").matches) {
        setDimensions({ width: 85, height: 20 });
      }
      // md
      else if (window.matchMedia("(min-width: 768px)").matches) {
        setDimensions({ width: 130, height: 15 });
      }
      // sm
      else if (window.matchMedia("(min-width: 640px)").matches) {
        setDimensions({ width: 130, height: 15 });
      }
      // mobile
      else {
        setDimensions({ width: 120, height: 20 }); // Default dimensions for mobile
      }
    };

    updateDimensions(); // Set initial dimensions on mount
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <section className="h-full w-[90%] flex flex-col place-content-center m-auto">
      <h2 className="font-vt323 flex items-center justify-center text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl h-1/2 w-full py-10">
        {description}
      </h2>
      <ul className="h-1/2 w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2">
        {options.map((item, i) => (
          <Option
            key={i}
            width={dimensions.width}
            height={dimensions.height}
            text={item}
          />
        ))}
      </ul>
    </section>
  );
};

export default Question;
