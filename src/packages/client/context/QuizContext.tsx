"use client";
import React, { createContext, useContext, useState } from "react";
import { QuizContextState, QuizProviderProps, UserCredentials } from "./types";
import { request } from "./request";

// Create the context with an initial empty state
const QuizContext = createContext<QuizContextState | undefined>(undefined);

export const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
  totalPages,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const setAnswer = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const submitQuiz = async (user: UserCredentials) => {
    try {
      const response = await fetch("/api/roboticsquest-responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, response: { answers } }),
      });

      const parsedResponse = await response.json();

      if (!response.ok) {
        return { success: false, message: "You already responded to form." };
      }

      return {
        success: true,
        message: "Success",
      };
    } catch (error) {
      console.error("Error submitting quiz", error);
    }

    const result = await request(
      { email: user.email, response: { answers } },
      "/roboticsquest-responses",
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
