import { useState } from 'react';

import StartQuizForm from '@/components/StartQuizForm';
import Quiz from '@/components/Quiz';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <>
      {!quizStarted ? (
        <StartQuizForm
          email={email}
          setEmail={setEmail}
          onStartQuiz={startQuiz}
        />
      ) : (
        <Quiz />
      )}
    </>
  );
};

export default HomePage;
