import { useState } from 'react';

import { QuizContext } from '@/context/QuizContext';
import { Result } from '@/types/quiz';

type Props = {
  children: React.ReactNode;
};

export const QuizProvider = ({ children }: Props) => {
  const [email, setEmail] = useState('');
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizResult, setQuizResult] = useState<Result | null>(null);

  const startQuiz = () => setIsQuizStarted(true);

  const resetQuiz = () => {
    setEmail('');
    setQuizResult(null);
    setIsQuizStarted(false);
  };

  return (
    <QuizContext.Provider
      value={{
        email,
        setEmail,
        quizResult,
        setQuizResult,
        isQuizStarted,
        startQuiz,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
