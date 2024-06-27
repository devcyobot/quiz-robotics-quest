"use client";
import React, { createContext, useContext, useState } from "react";
import { QuizContextType, QuizProviderProps, SubmitRequest } from "./types";
import { request } from "./request";

// Create the context with an initial empty state
const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
  totalPages,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const setAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${questionIndex}`.toLowerCase()]: [answer.toUpperCase()],
    }));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const submitQuiz = async (user: SubmitRequest) => {
    const result = await request(
      { email: user.email, formResponse: { answers } },
      `robotics-quest-quiz-responses`,
      "POST"
    );
    return result;
  };

  return (
    <QuizContext.Provider
      value={{
        currentPage,
        answers,
        totalPages,
        setAnswer,
        handleNext,
        submitQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Create a custom hook to use the QuizContext
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
