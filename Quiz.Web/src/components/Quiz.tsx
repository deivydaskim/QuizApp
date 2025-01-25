import { useEffect, useState } from 'react';
import Question from '@/components/Question';
import Button from '@/components/ui/Button';
import { fetchQuizData } from '@/lib/quizApi';
import { Question as QuestionType, Answer } from '@/types/quiz';

type Props = {
  email: string;
};

const Quiz = ({ email }: Props) => {
  const [quizData, setQuizData] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizData('/api/quizz');
        setQuizData(data);
      } catch (error) {
        console.error('Failed to fetch quiz data:', error);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  const handleAnswerChange = (
    questionId: number,
    answer: string | string[],
  ) => {
    setAnswers(prev =>
      // If answer exists, update it instead of creating new one. Might be better solution
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

  const handleSubmit = () => {
    const payload = {
      email,
      answers: answers.map(a => ({
        questionId: a.questionId,
        // To make sure answer is in array, backend handles arrays
        userAnswer: Array.isArray(a.answer) ? a.answer : [a.answer],
      })),
    };
    console.log('Submitting:', payload);
    // Send payload to backend
  };

  const isLastQuestion = currentQuestionIndex === quizData.length - 1;
  const currentQuestion = quizData[currentQuestionIndex];
  const currentAnswer =
    answers.find(a => a.questionId === currentQuestion.id)?.answer || '';

  if (isError) {
    return <div>Something went wrong. Try again later</div>;
  }

  if (quizData.length === 0) {
    return <div>Loading...</div>;
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
