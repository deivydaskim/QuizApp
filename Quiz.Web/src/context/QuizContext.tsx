import { createContext } from 'react';

import { Result } from '@/types/quiz';

interface QuizContextType {
  email: string;
  isQuizStarted: boolean;
  quizResult: Result | null;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  startQuiz: () => void;
  setQuizResult: (results: Result | null) => void;
  resetQuiz: () => void;
}

export const QuizContext = createContext<QuizContextType | null>(null);
