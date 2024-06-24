"use client";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";
import logoSrc from "../../../packages/client/assets/cyobot-logo.png";
import LogoBadge from "../../../packages/client/component/LogoBadge";
import { useQuiz } from "../../../packages/client/context/QuizContext";
import QuizPagination from "../../../packages/client/component/QuizPagination";
import { QuizData } from "../../../packages/client/data/QuizData";

const Quiz: FC = () => {
  const { answers, handleNext, totalPages } = useQuiz();
  const recordLength = Object.keys(answers).length;

  //   Submit the quiz after user has answered all questions
  useEffect(() => {
    if (recordLength === totalPages) {
      redirect("/email-invitation");
    }
  }, [answers, recordLength, totalPages]);

  return (
    <main className="container h-screen m-auto p-5 flex flex-col items-center">
      <div className="flex justify-between w-full">
        <LogoBadge description={"Robotics Quest"} src={logoSrc.src} />
      </div>
      <div className="flex flex-col items-center m-auto sm:m-0">
        <h1 className="font-vt323 text-brand-green text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex flex-col text-center">
          QUIZ
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            TIME
          </span>
        </h1>
        <div className="transform transition-all duration-300 container bg-black bg-opacity-50 h-[34rem] sm:h-[35rem] rounded-xl w-4/5 xl:w-[65rem] 2xl:w-[70rem] justify-self-center">
          <QuizPagination
            totalPages={totalPages}
            onPageChange={handleNext}
            questions={QuizData}
          />
        </div>
      </div>
    </main>
  );
};

export default Quiz;
