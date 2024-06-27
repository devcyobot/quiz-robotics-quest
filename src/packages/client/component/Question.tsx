import { FC, useEffect, useState } from "react";
import Option from "./Option";
import { useQuiz } from "../context/QuizContext";

type QuestionProps = {
  index: number;
  description: string;
  options: { label: string; value: string }[];
};
const Question: FC<QuestionProps> = ({ description, options, index }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { setAnswer, handleNext, currentPage, totalPages } = useQuiz();

  const handleOnClick = (text: string) => {
    setIsVisible(false);
    setAnswer(currentPage, text);

    setTimeout(() => {
      if (currentPage < totalPages) {
        handleNext();
      }
      setIsVisible(true);
    }, 200); // Adjust the delay as needed
  };

  useEffect(() => {
    // Trigger the transition effect when the component mounts
    setIsVisible(true);
    const updateDimensions = () => {
      // 2xl
      if (window.matchMedia("(min-width: 1536px)").matches) {
        setDimensions({ width: 100, height: 20 });
      }
      // xl
      else if (window.matchMedia("(min-width: 1280px)").matches) {
        setDimensions({ width: 95, height: 20 });
      }
      // lg
      else if (window.matchMedia("(min-width: 1024px)").matches) {
        setDimensions({ width: 70, height: 20 });
      }
      // md
      else if (window.matchMedia("(min-width: 768px)").matches) {
        setDimensions({ width: 220, height: 25 });
      }
      // sm
      else if (window.matchMedia("(min-width: 640px)").matches) {
        setDimensions({ width: 200, height: 25 });
      }
      // mobile
      else {
        setDimensions({ width: 150, height: 30 }); // Default dimensions for mobile
      }
    };

    updateDimensions(); // Set initial dimensions on mount
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <section
      className={`h-full w-[90%] flex flex-col place-content-center m-auto transition-opacity duration-200 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="font-vt323 flex items-center justify-center text-white text-base sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl h-1/3 w-full">
        <span className="sr-only">
          Question {index} of {totalPages}
        </span>{" "}
        {description}
      </h2>
      <ul className="h-2/3 w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2">
        {options.map((item, i) => (
          <Option
            key={i}
            width={dimensions.width}
            height={dimensions.height}
            option={item}
            handleOnClick={handleOnClick}
          />
        ))}
      </ul>
    </section>
  );
};

export default Question;
