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
    <main className="container h-screen m-auto p-5">
      <div>
        <div className="flex justify-between w-full">
          <LogoBadge description={"Robotics Quest"} src={logoSrc.src} />
        </div>
        <h1 className="font-vt323 text-brand-green text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl flex flex-col text-center">
          QUIZ{" "}
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            TIME
          </span>
        </h1>
      </div>
      <div className="bg-black bg-opacity-50 h-[35rem] rounded-xl w-4/5 m-auto ">
        <QuizPagination
          totalPages={totalPages}
          onPageChange={handleNext}
          questions={QuizData}
        />
      </div>
    </main>
  );
};

export default Quiz;
