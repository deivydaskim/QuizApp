import StartQuiz from '@/components/StartQuiz';
import Quiz from '@/components/Quiz';
import { useQuiz } from '@/hooks/useQuiz';
import QuizResult from '@/components/QuizResult';

const QuizPage = () => {
  const { isQuizStarted, quizResult } = useQuiz();

  if (quizResult) return <QuizResult />;
  if (isQuizStarted) return <Quiz />;

  return <StartQuiz />;
};

export default QuizPage;
