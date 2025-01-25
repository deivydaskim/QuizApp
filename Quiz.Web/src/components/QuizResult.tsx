import Button from '@/components/ui/Button';
import { Result } from '@/types/quiz';

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
        <p>{new Date(result.submittedAt).toLocaleString()}</p>
      </div>

      <Button onClick={onReset}>Start New Quiz</Button>
    </div>
  );
};

export default QuizResult;
