import { ReactNode } from "react";
export type SubmitQuiz = (args: {
  email: string;
  displayName: string;
  isMarketingConsent: string;
}) => Promise<SubmitResult>;

// Define the types for the context type and the provider props
export type QuizContextType = {
  currentPage: number;
  answers: Record<string, string[]>; // Keeps track of chosen options
  totalPages: number;
  setAnswer: (questionIndex: number, answer: string) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  submitQuiz: SubmitQuiz;
};

export type QuizProviderProps = {
  children: ReactNode;
  totalPages: number;
};

export type SubmitRequest = {
  email: string;
  displayName: string;
  isMarketingConsent: string;
  formResponse?: {
    answers: Record<string, string[]>;
  };
};

export type SubmitResult = {
  success: boolean;
  message: string;
};
