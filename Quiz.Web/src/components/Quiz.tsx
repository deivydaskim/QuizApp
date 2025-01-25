import { useEffect, useState } from 'react';

import Question from '@/components/Question';
import Button from '@/components/ui/Button';
import QuizResult from '@/components/QuizResult';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getQuizData, submitQuizData } from '@/lib/quizApi';
import { Question as QuestionType, Answer, Result } from '@/types/quiz';

type Props = {
  email: string;
  onReset: () => void;
};

const Quiz = ({ email, onReset }: Props) => {
  const [quizData, setQuizData] = useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getQuizData();
        setQuizData(data);
      } catch (error) {
        console.error('Failed to fetch quiz data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAnswerChange = (
    questionId: number,
    answer: string | string[],
  ) => {
    setAnswers(prev =>
      prev.find(a => a.questionId === questionId)
        ? prev.map(a => (a.questionId === questionId ? { ...a, answer } : a))
        : [...prev, { questionId, answer }],
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      email,
      answers: answers.map(a => ({
        questionId: a.questionId,
        userAnswer: Array.isArray(a.answer) ? a.answer : [a.answer],
      })),
    };

    setIsLoading(true);

    try {
      const responseData = await submitQuizData(payload);
      setResult(responseData);
    } catch (error) {
      console.error('Failed to submit quiz data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  const currentQuestion = quizData[currentQuestionIndex];
  const currentAnswer =
    answers.find(a => a.questionId === currentQuestion.id)?.answer || '';

  if (isError) {
    return (
      <div>
        <h3 className="text-center">Something went wrong. Try again later</h3>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (result) {
    return <QuizResult result={result} onReset={onReset} />;
  }

  return (
    <form className="flex h-full flex-col justify-between">
      <Question
        question={currentQuestion}
        answer={currentAnswer}
        onChange={handleAnswerChange}
      />
      <div className="self-end">
        {isLastQuestion ? (
          <Button variant="secondary" type="button" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="button" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </form>
  );
};

export default Quiz;
