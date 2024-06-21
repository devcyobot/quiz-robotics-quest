import { FC, useState } from "react";
import { useQuiz } from "../context/QuizContext";

type OptionProps = {
  width: number;
  height: number;
  text: string;
};

const Option: FC<OptionProps> = ({ width, height, text }) => {
  const { setAnswer, handleNext, currentPage, totalPages } = useQuiz();

  const [isHovered, setIsHovered] = useState(false);
  const handleOnClick = () => {
    setAnswer(currentPage, text);
    if (currentPage < totalPages) {
      handleNext();
    }
  };

  const getPath = (w: number, h: number): string => {
    const originalWidth = 125;
    const originalHeight = 20;
    const scaleX = w / originalWidth;
    const scaleY = h / originalHeight;

    return `
      M 0 ${6 * scaleY}
      V ${14 * scaleY} H ${3 * scaleX} V ${17 * scaleY} H ${6 * scaleX} V ${
      20 * scaleY
    }
      H ${119 * scaleX} V ${17 * scaleY} H ${122 * scaleX} V ${14 * scaleY} H ${
      125 * scaleX
    } V ${6 * scaleY}
      H ${122 * scaleX} V ${3 * scaleY} H ${119 * scaleX} V ${0} H ${
      6 * scaleX
    } V ${3 * scaleY} H ${3 * scaleX}
      V ${6 * scaleY} H 0 Z
    `;
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li
      className="cursor-pointer w-full h-1/2 list-none"
      onClick={handleOnClick}
    >
      <svg
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className="transition-transform duration-300 ease-in-out transform hover:scale-110 hover:-translate-x-2 hover:-translate-y-2"
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={isHovered ? "#1ad69c" : "#CEA455"}
          d={getPath(width, height)}
        ></path>
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-vt323 text-[0.5rem] text-white"
          textLength={text.length * 2.5}
          lengthAdjust="spacingAndGlyphs"
        >
          {text}
        </text>
      </svg>
    </li>
  );
};

export default Option;
