import { useEffect, useState } from 'react';

import Question from '@/components/Question';
import QuizResult from '@/components/QuizResult';
import LoadingSpinner from '@/components/ui/Spinner';
import { getQuizData, submitQuizData } from '@/lib/quizApi';
import { Question as QuestionType, Answer, Result } from '@/types/quiz';
import { MobileStepper, Button } from '@mui/material';

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
      // Check if an answer for the given questionId exists
      prev.find(a => a.questionId === questionId)
        ? // If answer exists, update the answer
          prev.map(a => (a.questionId === questionId ? { ...a, answer } : a))
        : // If it doesn't exist, add a new answer
          [...prev, { questionId, answer }],
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      email,
      answers: answers.map(a => ({
        questionId: a.questionId,
        // This ensures that value is in array, backend handles arrays for answer
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
      <h3 className="text-center">Something went wrong. Try again later</h3>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (result) {
    return <QuizResult result={result} onReset={onReset} />;
  }

  return (
    <div className="flex h-full flex-col justify-between gap-4 overflow-x-hidden">
      <Question
        question={currentQuestion}
        answer={currentAnswer}
        onChange={handleAnswerChange}
      />
      <MobileStepper
        variant="dots"
        steps={quizData.length}
        position="static"
        activeStep={currentQuestionIndex}
        nextButton={
          isLastQuestion ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isLastQuestion}
            >
              Next
            </Button>
          )
        }
        backButton={
          <Button
            variant="contained"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
          >
            Back
          </Button>
        }
      />
    </div>
  );
};

export default Quiz;
