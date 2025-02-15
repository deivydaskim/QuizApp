import { useQuiz } from '@/hooks/useQuiz';
import { formatDate } from '@/lib/utils';
import { Button } from '@mui/material';

const QuizResult = () => {
  const { quizResult, resetQuiz } = useQuiz();

  if (!quizResult) return null;

  return (
    <div className="flex h-full flex-col justify-around text-center">
      <h2 className="text-2xl font-semibold">Quiz Submitted</h2>
      <div className="space-y-2 text-center">
        <p>{quizResult.email}</p>
        <p className="text-4xl">
          Score: <strong>{quizResult.score}</strong>
        </p>
        <p>{formatDate(quizResult.submittedAt)}</p>
      </div>

      <Button variant="contained" color="secondary" onClick={resetQuiz}>
        Start New Quiz
      </Button>
    </div>
  );
};

export default QuizResult;
