import { useState } from 'react';

import StartQuiz from '@/components/StartQuiz';
import Quiz from '@/components/Quiz';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setEmail('');
    setQuizStarted(false);
  };

  return quizStarted ? (
    <Quiz email={email} onReset={resetQuiz} />
  ) : (
    <StartQuiz email={email} setEmail={setEmail} onStartQuiz={startQuiz} />
  );
};

export default HomePage;
