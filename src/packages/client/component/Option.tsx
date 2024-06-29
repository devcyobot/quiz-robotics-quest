import { FC, useEffect, useRef, useState } from "react";
import { useQuiz } from "../context/QuizContext";

type OptionProps = {
  handleOnClick: (text: string) => void;
  width: number;
  height: number;
  option: { label: string; value: string };
};

const Option: FC<OptionProps> = ({ width, height, option, handleOnClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to check if the device is mobile or tablet
  const isMobileOrTablet = () => {
    if (typeof window === "undefined") {
      return false;
    }
    const userAgent = navigator.userAgent.toLowerCase();
    const isTouchScreen =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return (
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|windows phone/.test(
        userAgent
      ) || isTouchScreen
    );
  };

  const handleMouseOver = () => {
    // not use hovering effects for mobile screens
    if (!isMobileOrTablet()) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    // not use hovering effects for mobile screens
    if (!isMobileOrTablet()) {
      setIsHovered(false);
    }
  };

  /**
   * Generates a SVG path string based on the given width and height.
   *
   * @param {number} w - The width of the SVG element.
   * @param {number} h - The height of the SVG element.
   * @return {string} The SVG path string.
   */
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

  const textRef = useRef<SVGTextElement | null>(null);
  const words = option.label.split(" ");
  const textWidthRatio = 1.2; // Adjust for text width for a line
  const lineHeight = 1.1; // em (unit)

  useEffect(() => {
    const svgText = textRef.current;
    if (!svgText) return;

    svgText.innerHTML = ""; // Clear existing content
    const words = option.label.split(" ");
    let lines = [];
    let currentLine: string[] = [];
    let currentLineWidth = 0;

    // Create a temporary tspan element to measure text width
    const tempTspan = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "tspan"
    );
    tempTspan.setAttribute("x", "50%");
    tempTspan.setAttribute("dy", "0");
    tempTspan.style.visibility = "hidden";
    svgText.appendChild(tempTspan);

    words.forEach((word) => {
      tempTspan.textContent = word;
      const wordWidth = tempTspan.getComputedTextLength();

      if (currentLineWidth + wordWidth <= width * textWidthRatio) {
        currentLine.push(word);
        currentLineWidth += wordWidth + 8; // 8 is an approximate space width
      } else {
        lines.push(currentLine.join(" "));
        currentLine = [word];
        currentLineWidth = wordWidth + 8; // 8 is an approximate space width
      }
    });

    lines.push(currentLine.join(" ")); // Add the last line

    // Remove the temporary tspan
    svgText.removeChild(tempTspan);

    const totalHeight = lines.length * lineHeight; // Total height in em units
    const startY = (10 + (height - totalHeight) / 2) * lineHeight * 0.06;

    lines.forEach((line, index) => {
      const tspan = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "tspan"
      );
      tspan.textContent = line;
      tspan.setAttribute("x", "50%");
      tspan.setAttribute("dy", index === 0 ? `${startY}em` : `${lineHeight}em`); // Line height
      tspan.setAttribute("text-anchor", "middle"); // Center align text

      svgText.appendChild(tspan);
    });
  }, [words, option.label, width, height]);

  // The threshold to use the customized text wrapping, minimum to be 50 characters
  // otherwise, use the default text
  let useTextPath = false;
  if (option.label.length > 40) useTextPath = true;

  return (
    <li className="cursor-pointer w-full h-1/2 list-none">
      <span className="sr-only">Option {option.label}</span>
      <svg
        onClick={() => handleOnClick(option.value)}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className={
          isHovered
            ? "transition-transform duration-300 ease-in-out transform hover:scale-110 hover:-translate-x-2 hover:-translate-y-2"
            : ""
        }
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={isHovered ? "#1ad69c" : "#CEA455"}
          d={getPath(width, height)}
        ></path>

        {useTextPath ? (
          <text
            ref={textRef}
            x="50%"
            y="0"
            dominantBaseline="middle"
            textAnchor="middle"
            aria-label={option.label}
            className="font-robotoRegular text-[0.45rem] sm:text-[0.5rem] md:text-[0.49rem] lg:text-[0.25rem] xl:text-[0.38rem] 2xl:text-[0.3rem]"
          ></text>
        ) : (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            aria-label={option.label}
            className="font-robotoRegular text-[0.45rem] sm:text-[0.5rem] md:text-[0.49rem] lg:text-[0.25rem] xl:text-[0.38rem] 2xl:text-[0.3rem]"
          >
            {option.label}
          </text>
        )}
      </svg>
    </li>
  );
};

export default Option;
