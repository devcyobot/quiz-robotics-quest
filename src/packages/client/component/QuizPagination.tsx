import React from "react";
import Question from "./Question";
import { useQuiz } from "../context/QuizContext";

interface PaginationProps {
  //   currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  questions: { desc: string; options: string[] }[];
}

const QuizPagination: React.FC<PaginationProps> = ({
  //   currentPage,
  totalPages,
  onPageChange,
  questions,
}) => {
  const {
    // answers,
    // setAnswer,
    // handleNext,
    // handlePrevious,
    currentPage,
    // totalPages,
    // submitQuiz,
  } = useQuiz();

  const currentQuest = questions[currentPage - 1];

  return (
    <div className="h-full relative font-vt323 flex items-center justify-center w-full text-white text-xl md:text-2xl lg:text-3xl">
      <div className="w-full h-full">
        <Question
          description={currentQuest.desc}
          options={currentQuest.options}
        />
      </div>
    </div>
  );
};

export default QuizPagination;
