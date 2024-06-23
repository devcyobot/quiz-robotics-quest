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
      if (window.matchMedia("(max-width: 640px)").matches) {
        setDimensions({ width: 100, height: 20 });
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setDimensions({ width: 130, height: 20 });
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        setDimensions({ width: 120, height: 20 });
      } else if (window.matchMedia("(max-width: 1280px)").matches) {
        setDimensions({ width: 95, height: 20 });
      } else {
        setDimensions({ width: 120, height: 20 }); // Default dimensions
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
      <h2 className="font-vt323 text-white text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center h-1/2 w-full py-10">
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
