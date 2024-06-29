import React from "react";
import Question from "./Question";
import { useQuiz } from "../context/QuizContext";
import Button from "../component/form/form-button/FormButton";

interface QuizPaginationProps {
  questions: { desc: string; options: { label: string; value: string }[] }[];
}

const QuizPagination: React.FC<QuizPaginationProps> = ({ questions }) => {
  const { currentPage, handlePrevious } = useQuiz();
  const currentQuest = questions[currentPage - 1];

  return (
    <div className="h-full relative font-vt323 flex flex-col items-center justify-evenly w-full text-white text-lg md:text-2xl lg:text-3xl">
      <div className="w-full h-full">
        <Question
          index={currentPage}
          description={currentQuest.desc}
          options={currentQuest.options}
        />
      </div>
      {currentPage > 1 && (
        <button
          onClick={handlePrevious}
          className="relative bottom-5 sm:bottom-10 sm:px-2 sm:py-1 text-brand-purple rounded-lg hover:shadow-custom-green bg-white w-1/2 sm:w-1/4"
        >
          BACK
        </button>
      )}
    </div>
  );
};

export default QuizPagination;
