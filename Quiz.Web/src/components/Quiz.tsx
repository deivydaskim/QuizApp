import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MobileStepper, Button } from '@mui/material';

import Question from '@/components/Question';
import LoadingSpinner from '@/components/ui/Spinner';
import { getQuizQuestions, postQuizAnswers } from '@/lib/quizApi';
import { Question as QuestionType, Answer } from '@/types/quiz';
import { useQuiz } from '@/hooks/useQuiz';

const Quiz = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { email, setQuizResult } = useQuiz();

  const {
    data: quizData = [],
    isLoading,
    isError,
  } = useQuery<QuestionType[]>({
    queryKey: ['quizQuestions'],
    queryFn: getQuizQuestions,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    mutate: submitQuiz,
    isPending: isSubmitPending,
    isError: isSubmitError,
  } = useMutation({
    mutationFn: postQuizAnswers,
    onSuccess: data => {
      setQuizResult(data);
    },
  });

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
        // Ensure value is in array, backend handles arrays for answer
        userAnswer: Array.isArray(a.answer) ? a.answer : [a.answer],
      })),
    };

    submitQuiz(payload);
  };

  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  const currentQuestion = quizData[currentQuestionIndex];
  const currentAnswer =
    answers.find(a => a.questionId === currentQuestion.id)?.answer || '';

  if (isError || isSubmitError) {
    return (
      <h3 className="text-center">Something went wrong. Try again later</h3>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
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
              disabled={isSubmitPending}
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
