import React from "react";
import Question from "./Question";
import { useQuiz } from "../context/QuizContext";

interface PaginationProps {
  questions: { desc: string; options: { label: string; value: string }[] }[];
}

const QuizPagination: React.FC<PaginationProps> = ({ questions }) => {
  const { currentPage } = useQuiz();

  const currentQuest = questions[currentPage - 1];

  return (
    <div className="h-full relative font-vt323 flex items-center justify-center w-full text-white text-xl md:text-2xl lg:text-3xl">
      <div className="w-full h-full">
        <Question
          index={currentPage}
          description={currentQuest.desc}
          options={currentQuest.options}
        />
      </div>
    </div>
  );
};

export default QuizPagination;
