import { Alert, Snackbar } from '@mui/material';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { validateEmail } from '@/lib/utils';
import { useState } from 'react';

type Props = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  onStartQuiz: () => void;
};

const StartQuizForm = ({ email, setEmail, onStartQuiz }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = () => {
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

    onStartQuiz();
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
        <Button onClick={handleSubmit} variant="primary">
          Start Quiz
        </Button>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error" onClose={handleCloseSnackbar}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StartQuizForm;
