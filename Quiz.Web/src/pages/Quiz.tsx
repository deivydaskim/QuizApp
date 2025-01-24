import { useState } from 'react';

import { Alert, Snackbar } from '@mui/material';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { validateEmail } from '@/lib/utils';

const QuizPage = () => {
  const [email, setEmail] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const startQuiz = () => {
    setError(null);

    if (email.trim() === '') {
      setError('Please enter your email to start the quiz.');
      setOpenSnackbar(true);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setOpenSnackbar(true);
      return;
    }

    setQuizStarted(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-around">
        <h1 className="text-primary text-2xl font-bold">
          Welcome to the Quiz!
        </h1>
        <div className="w-full max-w-80 space-y-2 text-center">
          <p>Enter your email to start the quiz</p>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <Button onClick={startQuiz} variant="primary">
          Start Quiz
        </Button>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuizPage;
