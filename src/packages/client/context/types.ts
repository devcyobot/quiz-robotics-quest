import { ReactNode } from "react";

// Define the types for the context state and the provider props
export type QuizContextState = {
  currentPage: number;
  answers: Record<number, string>; // Keeps track of chosen options
  totalPages: number;
  setAnswer: (questionIndex: number, answer: string) => void;
  handleNext: () => void;
  submitQuiz: SubmitQuiz;
};

export type QuizProviderProps = {
  children: ReactNode;
  totalPages: number;
};

export type SubmitQuiz = (
  args: UserCredentials
) => Promise<{ success: boolean; message: string }>;

export type UserCredentials = {
  email: string;
  response?: {
    answers: Record<number, string>;
  };
};

export type SubmitResult = {
  success: boolean;
  //   data: AppUser | null;
  message: string;
};
