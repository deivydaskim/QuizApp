import { formatDate } from '@/lib/utils';
import { Result } from '@/types/quiz';
import { Button } from '@mui/material';

type Props = {
  result: Result;
  onReset: () => void;
};

const QuizResult = ({ result, onReset }: Props) => {
  return (
    <div className="flex h-full flex-col justify-around text-center">
      <h2 className="text-2xl font-semibold">Quiz Submitted</h2>
      <div className="space-y-2 text-center">
        <p className="">{result.email}</p>
        <p className="text-4xl">
          Score: <strong>{result.score}</strong>
        </p>
        <p>{formatDate(result.submittedAt)}</p>
      </div>

      <Button variant="contained" color="secondary" onClick={onReset}>
        Start New Quiz
      </Button>
    </div>
  );
};

export default QuizResult;
